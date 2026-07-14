import { ArrowUpRightIcon, SquareIcon } from "lucide-react"

type IconPlaceholderProps = {
  lucide?: string
  tabler?: string
  hugeicons?: string
  phosphor?: string
  remixicon?: string
} & React.ComponentProps<"svg">

export function IconPlaceholder({
  lucide,
  tabler: _tabler,
  hugeicons: _hugeicons,
  phosphor: _phosphor,
  remixicon: _remixicon,
  ...props
}: IconPlaceholderProps) {
  const Icon = lucide === "ArrowUpRightIcon" ? ArrowUpRightIcon : SquareIcon

  return <Icon {...props} />
}
