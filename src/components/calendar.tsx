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
}

export const Calendar = React.forwardRef<HTMLDivElement, ICalendar>((props, ref) => {
  const { day, onDaySelect, allowedIntervals, ...boxProps } = props;
  const [viewDate, setViewDate] = React.useState(DateTime.local());
  const [transition, setTransition] = React.useState(initial);
  const months = useTransition(viewDate, transition);
  const days = React.useMemo(() => calendarDays(viewDate), [viewDate]);
  return (
    <Box my="2" bg="hotpink" {...boxProps} ref={ref}>
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" my="2">
        <ArrowButton
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
          onClick={() => {
            setViewDate(vd => vd.plus({ month: 1 }));
            setTransition(forward);
          }}
        >
          <ArrowNext />
        </ArrowButton>
      </Box>
      <WeekGrid>
        {Info.weekdays("short").map(d => (
          <Box key={d} textAlign="center">
            {d}
          </Box>
        ))}
      </WeekGrid>
      <Box overflow="hidden">
        {months(style => (
          <MonthDays style={style as any}>
            {days.map((d, i) => (
              <DayButton
                key={i}
                isToday={d.hasSame(DateTime.local(), "day")}
                isSelected={d.hasSame(day, "day")}
                isCurrentMonth={d.hasSame(viewDate, "month")}
                onClick={() => {
                  setTransition(getTransition(d, viewDate));
                  setViewDate(d);
                  onDaySelect(d);
                }}
              >
                {d.day}
              </DayButton>
            ))}
          </MonthDays>
        ))}
      </Box>
    </Box>
  );
});

const WeekGrid = styled(Box)(() => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
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
