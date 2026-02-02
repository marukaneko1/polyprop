'use client'

import { Shield, Target, BarChart3, AlertTriangle } from 'lucide-react'
import { clsx } from 'clsx'

interface RiskPanelProps {
  drawdownUsed: number
  drawdownLimit: number
  profitProgress: number
  profitTarget: number
  consistencyMax: number
  consistencyLimit: number
  stage: number
}

export function RiskPanel({
  drawdownUsed,
  drawdownLimit,
  profitProgress,
  profitTarget,
  consistencyMax,
  consistencyLimit,
  stage
}: RiskPanelProps) {
  const drawdownPercent = (drawdownUsed / drawdownLimit) * 100
  const profitPercent = (profitProgress / profitTarget) * 100
  const consistencyPercent = (consistencyMax / consistencyLimit) * 100

  const getDrawdownStatus = () => {
    if (drawdownPercent >= 80) return 'danger'
    if (drawdownPercent >= 50) return 'warning'
    return 'safe'
  }

  return (
    <div className="h-full flex flex-col">
      <div className="panel-header">
        <span className="panel-title">Risk Status</span>
        <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent font-medium">
          Stage {stage}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Drawdown Meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={clsx(
                'w-4 h-4',
                getDrawdownStatus() === 'danger' ? 'text-error' :
                getDrawdownStatus() === 'warning' ? 'text-warning' : 'text-success'
              )} />
              <span className="text-xs text-text-muted">Trailing Drawdown</span>
            </div>
            <span className={clsx(
              'text-xs font-mono',
              getDrawdownStatus() === 'danger' ? 'text-error' :
              getDrawdownStatus() === 'warning' ? 'text-warning' : 'text-success'
            )}>
              {drawdownUsed.toFixed(1)}% / {drawdownLimit}%
            </span>
          </div>
          <div className="risk-meter">
            <div 
              className={clsx('risk-meter-fill', getDrawdownStatus())}
              style={{ width: `${Math.min(drawdownPercent, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-text-muted">
            {(drawdownLimit - drawdownUsed).toFixed(1)}% remaining before breach
          </p>
        </div>

        {/* Profit Target */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-success" />
              <span className="text-xs text-text-muted">Profit Target</span>
            </div>
            <span className="text-xs font-mono text-success">
              {profitProgress.toFixed(1)}% / {profitTarget}%
            </span>
          </div>
          <div className="risk-meter">
            <div 
              className="risk-meter-fill safe"
              style={{ width: `${Math.min(profitPercent, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-text-muted">
            {(profitTarget - profitProgress).toFixed(1)}% to pass stage {stage}
          </p>
        </div>

        {/* Consistency Rule */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent" />
              <span className="text-xs text-text-muted">Consistency Rule</span>
            </div>
            <span className={clsx(
              'text-xs font-mono',
              consistencyPercent >= 80 ? 'text-warning' : 'text-success'
            )}>
              {consistencyMax.toFixed(0)}% max / {consistencyLimit}%
            </span>
          </div>
          <div className="risk-meter">
            <div 
              className={clsx('risk-meter-fill', consistencyPercent >= 80 ? 'warning' : 'safe')}
              style={{ width: `${Math.min(consistencyPercent, 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-text-muted">
            No single market can exceed {consistencyLimit}% of total profit
          </p>
        </div>

        {/* Rules Summary */}
        <div className="p-3 bg-surface rounded-lg border border-border space-y-2">
          <h4 className="text-[10px] text-text-muted uppercase tracking-wide">Compliance Status</h4>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Drawdown Rule</span>
              <span className={clsx(
                'px-1.5 py-0.5 rounded text-[10px] font-medium',
                drawdownPercent < 100 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              )}>
                {drawdownPercent < 100 ? 'Compliant' : 'Breached'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Consistency Rule</span>
              <span className={clsx(
                'px-1.5 py-0.5 rounded text-[10px] font-medium',
                consistencyPercent < 100 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              )}>
                {consistencyPercent < 100 ? 'Compliant' : 'Breached'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Profit Target</span>
              <span className={clsx(
                'px-1.5 py-0.5 rounded text-[10px] font-medium',
                profitPercent >= 100 ? 'bg-success/10 text-success' : 'bg-surface-elevated text-text-muted'
              )}>
                {profitPercent >= 100 ? 'Achieved' : 'In Progress'}
              </span>
            </div>
          </div>
        </div>

        {/* Warning if close to breach */}
        {drawdownPercent >= 70 && (
          <div className="flex items-start gap-2 p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-warning">Approaching Drawdown Limit</p>
              <p className="text-[10px] text-warning/70 mt-0.5">
                Consider reducing position sizes to protect your account.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
