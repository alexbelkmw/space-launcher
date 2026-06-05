/**
 * Преобразует ISO строку даты в формат DD.MM.YYYY HH:mm
 * @param isoString - Строка даты в формате ISO (например, '2026-05-24T23:49:45Z')
 * @returns Строка в формате DD.MM.YYYY HH:mm
 */
export function formatIsoDate(isoString: string): string {
  if (!isoString) return "";

  const date: Date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error("Некорректный формат ISO даты");
  }

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedParts: Intl.DateTimeFormatPart[] = new Intl.DateTimeFormat(
    "ru-RU",
    options,
  ).formatToParts(date);

  // Типизируем объект для сборки компонентов даты
  type DateParts = Record<Intl.DateTimeFormatPartTypes, string>;

  const parts = formattedParts.reduce<Partial<DateParts>>((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});

  // Извлекаем нужные свойства с гарантией наличия строки
  const day: string = parts.day ?? "00";
  const month: string = parts.month ?? "00";
  const year: string = parts.year ?? "0000";
  const hour: string = parts.hour ?? "00";
  const minute: string = parts.minute ?? "00";

  return `${day}.${month}.${year} ${hour}:${minute}`;
}
