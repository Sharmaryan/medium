export type InputProps = {
    label: string
    name: string
    error?: string
    placeholder?: string
    type?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}