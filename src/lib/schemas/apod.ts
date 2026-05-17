import { z } from "zod";

// Схема для валидации ответа NASA APOD (Astronomy Picture of the Day) API
export const NasaApodResponseSchema = z.object({
  // Дата публикации в формате YYYY-MM-DD
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in YYYY-MM-DD format",
  }),

  // Текстовое описание астрономического объекта или явления
  explanation: z.string(),

  // URL изображения в высоком разрешении (опционально, так как для видео может отсутствовать)
  hdurl: z.url().optional(),

  // Тип контента (обычно "image" или "video")
  media_type: z.enum(["image", "video"]),

  // Версия используемого API сервиса
  service_version: z.string(),

  // Название (заголовок) публикации
  title: z.string(),

  // URL стандартного изображения или плеера видео
  url: z.url(),

  // Внутренние теги NASA (необязательное поле, возвращается при наличии параметра concept_tags)
  concept_tags: z.array(z.string()).optional(),

  // Ссылка на превью (опционально, возвращается для видео-контента приthumbs=true)
  thumbnail_url: z.url().optional(),

  // Авторские права (необязательное поле, если изображение в общественном достоянии)
  copyright: z.string().optional(),
});

// Автоматический вывод типа TypeScript из созданной Zod-схемы
export type NasaApodResponse = z.infer<typeof NasaApodResponseSchema>;
