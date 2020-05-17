import * as React from "react";
import { DateTime, Info, Interval } from "luxon";
import { useTransition, animated } from "react-spring";
import { styled, useTheme } from "../theme";
import { Box, Button } from ".";
import { useTranslation, timeslots } from "..";
import { useForkedRef } from "@reach/utils";

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

const upwards = {
  from: { opacity: 0, transform: "translate3d(0,100%,0)", position: "absolute" },
  enter: { opacity: 1, transform: "translate3d(0,0%,0)", position: "relative" },
  leave: { opacity: 0, transform: "translate3d(0,-50%,0)", position: "absolute" },
};

const downwards = {
  from: { opacity: 0, transform: "translate3d(0,-100%,0)", position: "absolute" },
  enter: { opacity: 1, transform: "translate3d(0,0%,0)", position: "relative" },
  leave: { opacity: 0, transform: "translate3d(0,50%,0)", position: "absolute" },
};

interface ICalendar extends React.ComponentProps<typeof Box> {
  day: DateTime;
  onDaySelect: (d: DateTime) => void;
  allowedIntervals?: Interval[];
  initialFocusRef?: React.RefObject<HTMLButtonElement>;
  minutesInterval?: MinutesInterval;
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
  const {
    day,
    onDaySelect,
    allowedIntervals,
    initialFocusRef,
    minutesInterval,
    ...boxProps
  } = props;
  const [viewDate, setViewDate] = React.useState(day);
  const [transition, setTransition] = React.useState(initial);
  const months = useTransition(viewDate, transition);
  const days = React.useMemo(() => calendarDays(viewDate), [viewDate]);
  const gridRef = React.useRef<HTMLDivElement>(null);

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
          <MonthDays style={style as any} ref={gridRef}>
            {days.map((d, i) => {
              const isSelected = d.hasSame(day, "day");
              return (
                <GridButton
                  key={i}
                  aria-label={d.toLocaleString(DateTime.DATE_SHORT)}
                  disabled={isDayDisabled(d, allowedIntervals)}
                  isToday={d.hasSame(DateTime.local(), "day")}
                  isSelected={isSelected}
                  isCurrentMonth={d.hasSame(viewDate, "month")}
                  onClick={() => {
                    setTransition(getTransition(d, viewDate));
                    setViewDate(d);
                    onDaySelect(d);
                  }}
                  ref={isSelected ? initialFocusRef : undefined}
                  onKeyDown={e => onCalendarKeyDown(e, gridRef, i, 7)}
                >
                  {d.day}
                </GridButton>
              );
            })}
          </MonthDays>
        ))}
      </Box>
    </Box>
  );
});

const onCalendarKeyDown = (
  e: React.KeyboardEvent<HTMLButtonElement>,
  gridRef: React.RefObject<HTMLDivElement>,
  i: number,
  columns: number
) => {
  const { key } = e;
  const children = gridRef.current?.children as any;
  const siblingsCount = children?.length ?? 0;

  const siblings = [...Array(siblingsCount)].map(
    (_, index) => children[index] as HTMLButtonElement
  );

  switch (key) {
    case "ArrowRight": {
      if (i < siblingsCount - 1) {
        siblings
          .slice(i + 1)
          .find(b => !b.disabled)
          ?.focus();
      }
      break;
    }
    case "ArrowLeft": {
      if (i > 0) {
        siblings
          .slice(0, i)
          .reverse()
          .find(b => !b.disabled)
          ?.focus();
      }
      break;
    }
    case "ArrowUp": {
      if (i >= columns) {
        siblings
          .slice(0, i)
          .filter((_, index) => index % columns === i % columns)
          .reverse()
          .find(b => !b.disabled)
          ?.focus();
      }
      break;
    }
    case "ArrowDown": {
      if (i < siblingsCount - 1) {
        siblings
          .slice(i + columns)
          .filter((_, index) => index % columns === 0)
          .find(b => !b.disabled)
          ?.focus();
      }
      break;
    }
    default:
      return;
  }
};

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

interface ITimeGrid extends ICalendar {
  showSelection?: boolean;
}

const rows = 6;

export const TimeGrid = React.forwardRef<HTMLDivElement, ITimeGrid>((props, forwardedRef) => {
  const {
    allowedIntervals,
    minutesInterval = 60,
    day,
    onDaySelect,
    showSelection = true,
    initialFocusRef,
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
  const gridRef = React.useRef<HTMLDivElement>(null);
  const ref = useForkedRef(forwardedRef, gridRef);

  return (
    <StyledTimeGrid
      gridTemplateColumns={`repeat(${grid.length}, 1fr)`}
      gridGap="2"
      {...boxProps}
      ref={ref}
    >
      {grid.map((column, columnIndex) => (
        <Box key={columnIndex} display="grid" gridTemplateRows={`repeat(${rows}, 1fr)`} gridGap="1">
          {column.map((row, rowIndex) => {
            const isSelected = showSelection && !!(day && row.hasSame(day, "minute"));
            return (
              <GridButton
                key={rowIndex}
                disabled={isDisabled(row)}
                isSelected={isSelected}
                isToday={false}
                isCurrentMonth={true}
                onClick={() => onDaySelect(row)}
                ref={isSelected ? initialFocusRef : undefined}
                onKeyDown={e =>
                  onTimeKeyDown(e, gridRef, columnIndex * rows + rowIndex, {
                    columns: grid.length,
                    rows: column.length,
                  })
                }
              >
                {row.toFormat("HH:mm")}
              </GridButton>
            );
          })}
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

const onTimeKeyDown = (
  e: React.KeyboardEvent<HTMLButtonElement>,
  gridRef: React.RefObject<HTMLDivElement>,
  i: number,
  size: { columns: number; rows: number }
) => {
  const { key } = e;
  const children = gridRef.current?.children as any;
  const siblingsCount = size.columns * size.rows;

  const siblings: HTMLButtonElement[] = [];
  [...Array(size.columns)].map((_, column) =>
    ((children[column] as HTMLDivElement).children as any).forEach((child: HTMLButtonElement) =>
      siblings.push(child)
    )
  );

  console.log({ siblings });

  switch (key) {
    case "ArrowDown": {
      if (i < siblingsCount - 1) {
        siblings
          .slice(i + 1)
          .find(b => !b.disabled)
          ?.focus();
      }
      break;
    }
    case "ArrowUp": {
      if (i > 0) {
        siblings
          .slice(0, i)
          .reverse()
          .find(b => !b.disabled)
          ?.focus();
      }
      break;
    }
    case "ArrowLeft": {
      if (i >= size.rows) {
        siblings
          .slice(0, i)
          .filter((_, index) => index % size.rows === i % size.rows)
          .reverse()
          .find(b => !b.disabled)
          ?.focus();
      }
      break;
    }
    case "ArrowRight": {
      if (i < siblingsCount - 1) {
        siblings
          .slice(i + size.rows)
          .filter((_, index) => index % size.rows === 0)
          .find(b => !b.disabled)
          ?.focus();
      }
      break;
    }
    default:
      return;
  }
};

const StyledTimeGrid = styled(Box)(({ theme: { colors, mode } }) => ({
  display: "grid",
  marginLeft: "auto",
  marginRight: "auto",
}));

export const DateTimeCalendar = React.forwardRef<HTMLDivElement, ICalendar>((props, ref) => {
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

  const [transition, setTransition] = React.useState(initial);
  const times = useTransition(selectedDay, transition);

  return (
    <Box
      display="grid"
      gridTemplateColumns={["", "auto minmax(240px, 1fr)"]}
      gridGap="4"
      {...boxProps}
      ref={ref}
    >
      <DayCalendar
        day={selectedDay}
        onDaySelect={d => {
          if (!selectedDay.hasSame(d, "day")) {
            setTimeChangedBySideEffect(true);
            const { year, month, day } = d;
            setTransition(d > selectedDay ? upwards : downwards);
            setSelectedDay(selectedDay.set({ year, month, day }));
          }
        }}
        allowedIntervals={allowedIntervals}
      />
      <Box>
        <Box textAlign="center">{selectedDay.toLocaleString({ weekday: "long" })}</Box>
        <Box mt="4" mb="2" textAlign="center">
          {selectedDay.toLocaleString(DateTime.DATE_MED)}
        </Box>
        <Box overflow="hidden" style={{ transition: "width 0.2s ease" }}>
          {times(style => (
            <AnimatedTimes style={style as any}>
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
                initialFocusRef={initialFocusRef}
              />
            </AnimatedTimes>
          ))}
        </Box>
      </Box>
    </Box>
  );
});

const AnimatedTimes = animated(styled(Box)(() => ({ width: "100%" })));

export const TimeCalendar = React.forwardRef<HTMLDivElement, ICalendar>((props, ref) => {
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
  const [transition, setTransition] = React.useState(initial);
  const transitionCondition = React.useMemo(() => selectedDay.toFormat("yyyyLLdd"), [selectedDay]);
  const animation = useTransition(transitionCondition, transition);

  return (
    <Box minWidth="200px" {...boxProps} ref={ref}>
      <Box display="grid" gridTemplateColumns="auto auto 1fr" gridGap="2">
        <ArrowButton
          aria-label={t("ui.calendar.previous_day")}
          onClick={() => {
            setTimeChangedBySideEffect(true);
            setSelectedDay(d => d.minus({ days: 1 }));
            setTransition(backwards);
          }}
          ml="3"
        >
          <ArrowPrevious />
        </ArrowButton>
        <ArrowButton
          aria-label={t("ui.calendar.next_day")}
          onClick={() => {
            setTimeChangedBySideEffect(true);
            setSelectedDay(d => d.plus({ days: 1 }));
            setTransition(forward);
          }}
          mr="3"
        >
          <ArrowNext />
        </ArrowButton>
        <Box textAlign="left">{selectedDay.toLocaleString(DateTime.DATE_MED)}</Box>
      </Box>
      <Box overflow="hidden">
        {animation(style => (
          <animated.div style={style as any}>
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
              initialFocusRef={initialFocusRef}
              width="max-content"
            />
          </animated.div>
        ))}
      </Box>
    </Box>
  );
});
