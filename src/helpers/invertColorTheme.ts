import { IColorTheme } from "../theme/colors";

export default function invertColorTheme(colorGrade: IColorTheme): IColorTheme {
  const grades: Array<{ grade: string; value: string }> = Object.keys(colorGrade).map(
    (grade: string) => ({
      grade,
      value: colorGrade[grade] as string,
    })
  );
  return grades.reduce(
    (res, item, i) => ({
      ...res,
      [grades[grades.length - i - 1].grade]: item.value,
    }),
    { ...colorGrade }
  );
}
