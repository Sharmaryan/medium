import { Status } from "../Toast/Toast.types"

export enum Size {
  Small = "SMALL",
  Medium = "MEDIUM",
  Large = "LARGE",
  Default = "DEFAULT"
}

export type LoaderProps = {
  type?: Status
  size?: Size
}