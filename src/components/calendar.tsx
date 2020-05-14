import * as React from "react";
import { DateTime, Info, Interval } from "luxon";
import { useTransition, animated } from "react-spring";
import { styled } from "../theme";
import { Box, Button } from ".";

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
  const rows = res.length / 7;
  for (let i = rows; i < 6; i++) {
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
  initialFocusRef?: React.MutableRefObject<HTMLButtonElement>;
}

const isDayDisabled = (day: DateTime, allowedIntervals?: Interval[]) => {
  if (!allowedIntervals) {
    return false;
  } else {
    const dayInterval = Interval.fromDateTimes(day.startOf("day"), day.endOf("day"));
    return !allowedIntervals.some(i => i.overlaps(dayInterval));
  }
};

export const Calendar = React.forwardRef<HTMLDivElement, ICalendar>((props, ref) => {
  const { day, onDaySelect, allowedIntervals, initialFocusRef, ...boxProps } = props;
  const [viewDate, setViewDate] = React.useState(day);
  const [transition, setTransition] = React.useState(initial);
  const months = useTransition(viewDate, transition);
  const days = React.useMemo(() => calendarDays(viewDate), [viewDate]);
  const leftArrowRef = React.useRef<HTMLButtonElement>(null);
  const rightArrowRef = React.useRef<HTMLButtonElement>(null);
  const daysRef = React.useRef<HTMLDivElement>(null);

  return (
    <StyledCalendar my="2" p="3" {...boxProps} ref={ref}>
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)">
        <ArrowButton
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
              <DayButton
                key={i}
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
              </DayButton>
            ))}
          </MonthDays>
        ))}
      </Box>
    </StyledCalendar>
  );
});

const StyledCalendar = styled(Box)(({ theme: { colors, mode } }) => {
  const bg = mode === "dark" ? colors.neutral.darkest : colors.neutral.lightest;
  const shadow = mode === "dark" ? colors.neutral.medium : colors.neutral.medium;
  return {
    background: bg,
    boxShadow: `0 1px 2px ${shadow}88, 0 1px 1px ${shadow}74`,
  };
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

const DayButton = styled(Button)<{
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
}));
DayButton.defaultProps = {
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
