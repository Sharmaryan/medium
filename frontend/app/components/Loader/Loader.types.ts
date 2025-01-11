import { Status } from "../Toast/Toast.types"

export type LoaderProps = {
  type: Status
  size : 'small' | 'medium' | 'large'
}