import { clsx } from 'clsx'
import { PropsWithChildren } from 'react'

export default function GlassCard({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx('glass', className)}>
      {children}
    </div>
  )
}
