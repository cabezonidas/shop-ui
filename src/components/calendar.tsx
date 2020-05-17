import * as React from "react";
import { DateTime, Info, Interval } from "luxon";
import { useTransition, animated } from "react-spring";
import { styled, useTheme } from "../theme";
import { Box, Button } from ".";
import { useTranslation } from "..";

const current = (date: DateTime) =>
  [...Array(date.daysInMonth)].map((_, i) => date.set({ day: i + 1 }));

const previous = (date: DateTime) => {
  const lastMonth = date.set({ month: date.month - 1 });
  return [...Array(date.startOf("month").weekday - 1)]
    .map((_, i) => lastMonth.set({ day: lastMonth.endOf("month").day - i }))
    .reverse();
};

const following = (date: DateTime) => {
  const nextMonth = date.set({ month: date.month + 1 });
  return [...Array(7 - date.endOf("month").weekday)].map((_, i) =>
    nextMonth.set({ day: nextMonth.startOf("month").day + i })
  );
};

const calendarDays = (d: DateTime) => {
  let res = [...previous(d), ...current(d), ...following(d)];
  const weeks = res.length / 7;
  for (let i = weeks; i < 6; i++) {
    const lastDay = res[res.length - 1];
    res = [...res, ...[...Array(7)].map((_, index) => lastDay.plus({ days: index + 1 }))];
  }
  return res;
};

const getTransition = (d: DateTime, viewDate: DateTime) =>
  d.month < viewDate.month ? backwards : d.month > viewDate.month ? forward : initial;

const initial = {
  from: { opacity: 1, transform: "translate3d(0%,0,0)", position: "absolute" },
  enter: { opacity: 1, transform: "translate3d(0%,0,0)", position: "relative" },
  leave: { opacity: 1, transform: "translate3d(0%,0,0)", position: "absolute" },
};

const forward = {
  from: { opacity: 0, transform: "translate3d(100%,0,0)", position: "absolute" },
  enter: { opacity: 1, transform: "translate3d(0%,0,0)", position: "relative" },
  leave: { opacity: 0, transform: "translate3d(-50%,0,0)", position: "absolute" },
};

const backwards = {
  from: { opacity: 0, transform: "translate3d(-100%,0,0)", position: "absolute" },
  enter: { opacity: 1, transform: "translate3d(0%,0,0)", position: "relative" },
  leave: { opacity: 0, transform: "translate3d(50%,0,0)", position: "absolute" },
};

interface ICalendar extends React.ComponentProps<typeof Box> {
  day: DateTime;
  onDaySelect: (d: DateTime) => void;
  allowedIntervals?: Interval[];
  initialFocusRef?: React.RefObject<HTMLButtonElement>;
}

const isDayDisabled = (day: DateTime, allowedIntervals?: Interval[]) => {
  if (!allowedIntervals) {
    return false;
  } else {
    const dayInterval = Interval.fromDateTimes(day.startOf("day"), day.endOf("day"));
    return !allowedIntervals.some(i => i.overlaps(dayInterval));
  }
};

const enUsCalendar = {
  ui: {
    calendar: {
      previous_month: "Previos month",
      next_month: "Next month",
      previous_day: "Previos day",
      next_day: "Next day",
      no_times_today: "No times available",
    },
  },
};
const esArCalendar = {
  ui: {
    calendar: {
      previous_month: "Mes anterior",
      next_month: "Mes siguiente",
      previous_day: "Día anterior",
      next_day: "Día siguiente",
      no_times_today: "Sin horarios disponibles",
    },
  },
};

export const DayCalendar = React.forwardRef<HTMLDivElement, ICalendar>((props, ref) => {
  const { day, onDaySelect, allowedIntervals, initialFocusRef, ...boxProps } = props;
  const [viewDate, setViewDate] = React.useState(day);
  const [transition, setTransition] = React.useState(initial);
  const months = useTransition(viewDate, transition);
  const days = React.useMemo(() => calendarDays(viewDate), [viewDate]);
  const leftArrowRef = React.useRef<HTMLButtonElement>(null);
  const rightArrowRef = React.useRef<HTMLButtonElement>(null);
  const daysRef = React.useRef<HTMLDivElement>(null);

  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", enUsCalendar, true, true);
  i18n.addResourceBundle("es-AR", "translation", esArCalendar, true, true);

  return (
    <Box {...boxProps} ref={ref}>
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)">
        <ArrowButton
          aria-label={t("ui.calendar.previous_month")}
          onClick={() => {
            setViewDate(vd => vd.minus({ month: 1 }));
            setTransition(backwards);
          }}
          ref={leftArrowRef}
          onKeyDown={e => {
            const { key } = e;
            const daysChildren = daysRef.current?.children as any;
            switch (key) {
              case "ArrowRight": {
                rightArrowRef.current?.focus();
                break;
              }
              case "ArrowLeft": {
                daysChildren[days.length - 1]?.focus();
                break;
              }
              case "ArrowUp": {
                daysChildren[days.length - 7]?.focus();
                break;
              }
              case "ArrowDown": {
                daysChildren[0]?.focus();
                break;
              }
              default:
                return;
            }
          }}
        >
          <ArrowPrevious />
        </ArrowButton>
        <Box textAlign="center" style={{ gridColumnStart: 2, gridColumnEnd: 7 }}>
          {`${viewDate.monthLong} ${viewDate.year}`}
        </Box>
        <ArrowButton
          aria-label={t("ui.calendar.next_month")}
          onClick={() => {
            setViewDate(vd => vd.plus({ month: 1 }));
            setTransition(forward);
          }}
          ref={rightArrowRef}
          onKeyDown={e => {
            const { key } = e;
            const daysChildren = daysRef.current?.children as any;
            switch (key) {
              case "ArrowLeft": {
                leftArrowRef.current?.focus();
                break;
              }
              case "ArrowUp": {
                daysChildren[days.length - 1]?.focus();
                break;
              }
              case "ArrowDown": {
                daysChildren[6]?.focus();
                break;
              }
              case "ArrowRight": {
                daysChildren[0]?.focus();
                break;
              }
              default:
                return;
            }
          }}
        >
          <ArrowNext />
        </ArrowButton>
      </Box>
      <WeekGrid mt="4" mb="2">
        {Info.weekdays("short").map(d => (
          <Box key={d} textAlign="center">
            {d}
          </Box>
        ))}
      </WeekGrid>
      <Box overflow="hidden">
        {months(style => (
          <MonthDays style={style as any} ref={daysRef}>
            {days.map((d, i) => (
              <GridButton
                key={i}
                aria-label={d.toLocaleString(DateTime.DATE_SHORT)}
                disabled={isDayDisabled(d, allowedIntervals)}
                isToday={d.hasSame(DateTime.local(), "day")}
                isSelected={d.hasSame(day, "day")}
                isCurrentMonth={d.hasSame(viewDate, "month")}
                onClick={() => {
                  setTransition(getTransition(d, viewDate));
                  setViewDate(d);
                  onDaySelect(d);
                }}
                ref={d.hasSame(day, "day") ? initialFocusRef : undefined}
                onKeyDown={e => {
                  const { key } = e;
                  const siblings = daysRef.current?.children as any;
                  switch (key) {
                    case "ArrowRight": {
                      siblings[i + 1]?.focus();
                      if (i === days.length - 1) {
                        leftArrowRef.current?.focus();
                      }
                      break;
                    }
                    case "ArrowLeft": {
                      siblings[i - 1]?.focus();
                      if (i === 0) {
                        rightArrowRef.current?.focus();
                      }
                      break;
                    }
                    case "ArrowUp": {
                      siblings[i - 7]?.focus();
                      if (i === 0) {
                        leftArrowRef.current?.focus();
                      }
                      if (i === 6) {
                        rightArrowRef.current?.focus();
                      }
                      if (i < 6 && i > 0) {
                        siblings[days.length - 7 + i]?.focus();
                      }
                      break;
                    }
                    case "ArrowDown": {
                      siblings[i + 7]?.focus();
                      if (i === days.length - 1) {
                        rightArrowRef.current?.focus();
                      }
                      if (i === days.length - 7) {
                        leftArrowRef.current?.focus();
                      }
                      if (i < days.length - 1 && i > days.length - 7) {
                        siblings[7 - days.length + i]?.focus();
                      }
                      break;
                    }
                    default:
                      return;
                  }
                }}
              >
                {d.day}
              </GridButton>
            ))}
          </MonthDays>
        ))}
      </Box>
    </Box>
  );
});

const WeekGrid = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gridGap: theme.space[1],
}));

const MonthDays = animated(WeekGrid);

const ArrowButton = styled(Button)(() => ({
  alignSelf: "center",
  justifyContent: "space-around",
}));
ArrowButton.defaultProps = {
  variant: "transparent",
  type: "button",
};

const GridButton = styled(Button)<{
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
}>(({ theme, isToday, isCurrentMonth, isSelected }) => ({
  justifyContent: "space-around",
  margin: `${theme.space[1]} auto`,
  padding: `${theme.space[1]} ${theme.space[1]}`,
  fontWeight: isToday || isSelected ? "bold" : undefined,
  borderBottom: `1px solid ${isSelected ? theme.colors.neutral.medium : "transparent"}`,
  color: !isCurrentMonth ? theme.colors.neutral.medium : undefined,
  "&:hover, &:focus": {
    color: "unset",
    borderBottom: `1px solid ${theme.colors.neutral.medium}`,
  },
  "&:disabled": {
    cursor: "not-allowed",
    color:
      theme.mode === "dark" ? theme.colors.neutral.mediumDark : theme.colors.neutral.mediumLight,
    borderBottom: `1px solid transparent`,
  },
}));
GridButton.defaultProps = {
  variant: "transparent",
  type: "button",
};

const ArrowPrevious = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="#4E5864" ref={ref} {...props}>
      <path d="M-2.49779e-07 5.71429L10 11.4286L10 0L-2.49779e-07 5.71429Z" />
    </svg>
  )
);

const ArrowNext = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg width="10" height="12" viewBox="0 0 10 12" fill="#4E5864" ref={ref} {...props}>
    <path d="M10 6.28571L1.36284e-07 0.571428L0 12L10 6.28571Z" />
  </svg>
));

export type MinutesInterval = 1 | 5 | 10 | 15 | 20 | 30 | 60 | 90 | 120;

interface ITimeGrid extends React.ComponentProps<typeof StyledTimeGrid> {
  day?: DateTime;
  onDaySelect: (d: DateTime) => void;
  allowedIntervals?: Interval[];
  minutesInterval?: MinutesInterval;
  showSelection?: boolean;
}

const rows = 6;
const timeslots = (day: DateTime, minutesInterval: MinutesInterval) => {
  const startOfDay = day.startOf("day");
  return [...Array(1440 / minutesInterval)].map((_, cell) =>
    startOfDay.plus({ minutes: minutesInterval * cell })
  );
};
export const TimeGrid = React.forwardRef<HTMLDivElement, ITimeGrid>((props, ref) => {
  const {
    allowedIntervals,
    minutesInterval = 60,
    day,
    onDaySelect,
    showSelection = true,
    ...boxProps
  } = props;

  const selectedDay = React.useMemo(() => day ?? DateTime.local(), [day]);
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", enUsCalendar, true, true);
  i18n.addResourceBundle("es-AR", "translation", esArCalendar, true, true);

  const isDisabled = (d: DateTime) =>
    allowedIntervals ? !allowedIntervals.some(i => i.contains(d)) : false;

  const grid = React.useMemo(() => {
    const cells = timeslots(selectedDay, minutesInterval);
    return cells
      .reduce<DateTime[][]>(
        (res, item, index) => {
          const columnIndex = (index - (index % rows)) / rows;
          res[columnIndex] = [...res[columnIndex], item];
          return [...res];
        },
        [...Array(cells.length / rows)].map(c => [])
      )
      .filter(arr => arr.some(d => !isDisabled(d)));
  }, [selectedDay, minutesInterval]);

  const theme = useTheme();

  return (
    <StyledTimeGrid
      gridTemplateColumns={`repeat(${grid.length}, 1fr)`}
      gridGap="2"
      {...boxProps}
      ref={ref}
    >
      {grid.map((column, columnIndex) => (
        <Box key={columnIndex} display="grid" gridTemplateRows={`repeat(${rows}, 1fr)`} gridGap="1">
          {column.map((row, rowIndex) => (
            <GridButton
              key={rowIndex}
              disabled={isDisabled(row)}
              isSelected={showSelection && !!(day && row.hasSame(day, "minute"))}
              isToday={false}
              isCurrentMonth={true}
              onClick={() => onDaySelect(row)}
            >
              {row.toFormat("HH:mm")}
            </GridButton>
          ))}
        </Box>
      ))}
      {grid.length === 0 && (
        <Box textAlign="center" color={theme.colors.neutral.medium}>
          {t("ui.calendar.no_times_today")}
        </Box>
      )}
    </StyledTimeGrid>
  );
});

const StyledTimeGrid = styled(Box)(({ theme: { colors, mode } }) => ({
  display: "grid",
  marginLeft: "auto",
  marginRight: "auto",
}));

const TimeButton = styled(Button)(() => ({}));

TimeButton.defaultProps = {
  variant: "transparent",
};

const isDateTimeDisabled = (day: DateTime, allowedIntervals?: Interval[]) => {
  if (!allowedIntervals) {
    return false;
  } else {
    return !allowedIntervals.some(i => i.contains(day));
  }
};

export const DateTimeCalendar = React.forwardRef<
  HTMLDivElement,
  ICalendar & { minutesInterval?: MinutesInterval }
>((props, ref) => {
  const {
    day: dayProp,
    onDaySelect,
    initialFocusRef,
    allowedIntervals,
    minutesInterval = 60,
    ...boxProps
  } = props;

  const [selectedDay, setSelectedDay] = React.useState(dayProp);
  const [timeChangedBySideEffect, setTimeChangedBySideEffect] = React.useState(false);
  React.useEffect(() => {
    setSelectedDay(dayProp);
  }, [dayProp]);

  return (
    <Box display="grid" gridTemplateColumns={["", "1fr 1fr"]} gridGap="4" {...boxProps} ref={ref}>
      <DayCalendar
        day={selectedDay}
        onDaySelect={d => {
          if (!selectedDay.hasSame(d, "day")) {
            setTimeChangedBySideEffect(true);
            const { year, month, day } = d;
            setSelectedDay(d => d.set({ year, month, day }));
          }
        }}
        allowedIntervals={allowedIntervals}
      />
      <Box>
        <Box textAlign="center">{selectedDay.toLocaleString({ weekday: "long" })}</Box>
        <Box mt="4" mb="2" textAlign="center">
          {selectedDay.toLocaleString(DateTime.DATE_MED)}
        </Box>
        <TimeGrid
          day={selectedDay}
          showSelection={!timeChangedBySideEffect}
          onDaySelect={({ hour, minute }) => {
            const newValue = selectedDay.set({ hour, minute }).startOf("second");
            setTimeChangedBySideEffect(false);
            onDaySelect(newValue);
          }}
          allowedIntervals={allowedIntervals}
          minutesInterval={minutesInterval}
        />
      </Box>
    </Box>
  );
});

export const TimeCalendar = React.forwardRef<
  HTMLDivElement,
  ICalendar & { minutesInterval?: MinutesInterval }
>((props, ref) => {
  const {
    day: dayProp,
    onDaySelect,
    initialFocusRef,
    allowedIntervals,
    minutesInterval = 60,
    ...boxProps
  } = props;

  const [selectedDay, setSelectedDay] = React.useState(dayProp);
  const [timeChangedBySideEffect, setTimeChangedBySideEffect] = React.useState(false);
  React.useEffect(() => {
    setSelectedDay(dayProp);
  }, [dayProp]);
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", enUsCalendar, true, true);
  i18n.addResourceBundle("es-AR", "translation", esArCalendar, true, true);

  return (
    <Box minWidth="240px" {...boxProps} ref={ref}>
      <Box display="grid" gridTemplateColumns="auto 1fr auto" gridGap="2">
        <ArrowButton
          aria-label={t("ui.calendar.previous_day")}
          onClick={() => {
            setTimeChangedBySideEffect(true);
            setSelectedDay(d => d.minus({ days: 1 }));
          }}
          ml="6"
          style={{ transform: "rotate(90deg)" }}
        >
          <ArrowPrevious />
        </ArrowButton>
        <Box textAlign="center">{selectedDay.toLocaleString(DateTime.DATE_MED)}</Box>
        <ArrowButton
          aria-label={t("ui.calendar.next_day")}
          onClick={() => {
            setTimeChangedBySideEffect(true);
            setSelectedDay(d => d.plus({ days: 1 }));
          }}
          mr="6"
          style={{ transform: "rotate(90deg)" }}
        >
          <ArrowNext />
        </ArrowButton>
      </Box>

      <TimeGrid
        pt="4"
        day={selectedDay}
        showSelection={!timeChangedBySideEffect}
        onDaySelect={({ hour, minute }) => {
          const newValue = selectedDay.set({ hour, minute }).startOf("second");
          setTimeChangedBySideEffect(false);
          onDaySelect(newValue);
        }}
        allowedIntervals={allowedIntervals}
        minutesInterval={minutesInterval}
      />
    </Box>
  );
});

export const soonestAvailable = (
  fromNow: boolean,
  minutesInterval: MinutesInterval,
  allowedIntervals?: Interval[]
) => {
  const now = DateTime.local();
  if (!allowedIntervals) {
    const newAllowedTime = DateTime.local().startOf("minute");
    const offset = newAllowedTime.minute % minutesInterval;
    return offset ? newAllowedTime.plus({ minutes: minutesInterval - offset }) : newAllowedTime;
  }

  const minDate = allowedIntervals.sort((a, b) => (a.start > b.start ? 1 : -1))[0]?.start;
  const maxDate = allowedIntervals.sort((a, b) => (a.end < b.end ? 1 : -1))[0]?.end;

  if (minDate && maxDate) {
    const days = Math.ceil(maxDate.diff(minDate, "days").toObject().days ?? 1);
    const daysIntervals = [...Array(days)].map((_, d) =>
      timeslots(minDate.startOf("day").plus({ days: d }), minutesInterval)
    );
    let soonest: DateTime | undefined;
    for (const daysInt of daysIntervals) {
      soonest = daysInt
        .filter(t => (fromNow ? t > now : true))
        .find(t => allowedIntervals.find(ai => ai.contains(t)));
      if (soonest) {
        break;
      }
    }
    return soonest;
  }
};
