import { type Props as ActivityCalendarProps } from "react-activity-calendar"

/*
 * Adapted from the original project "react-github-calendar"
 * https://github.com/grubersjoe/react-github-calendar
 *
 * Original Author: Joe Gruber
 *
 * This project is licensed under the MIT License.
 * See the LICENSE file in the root directory of this source tree for more information.
 *
 */

export interface Activity {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export type Year = number | "last"

export interface ApiResponse {
  total: {
    [year: number]: number
    [year: string]: number // 'lastYear;
  }
  contributions: Array<Activity>
}

export interface ApiErrorResponse {
  error: string
}

type Color = string
type ColorScale = [Color, Color, Color, Color, Color]

export type ThemeInput =
  | {
      light: ColorScale | [from: Color, to: Color]
      dark?: ColorScale | [from: Color, to: Color]
    }
  | {
      light?: ColorScale | [from: Color, to: Color]
      dark: ColorScale | [from: Color, to: Color]
    }

export interface Props extends Omit<ActivityCalendarProps, "data" | "theme"> {
  username: string
  errorMessage?: string
  theme?: ThemeInput
  throwOnError?: boolean
  // eslint-disable-next-line no-unused-vars
  transformData?: (data: Array<Activity>) => Array<Activity>
  transformTotalCount?: boolean
  year?: Year
}
