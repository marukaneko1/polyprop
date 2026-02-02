'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Settings, Bell, User, ChevronDown, LogOut,
  Moon, Sun, Volume2, VolumeX, Shield, HelpCircle,
  CheckCircle, AlertTriangle, Info, X
} from 'lucide-react'
import { clsx } from 'clsx'

interface TradingHeaderProps {
  accountBalance: number
  accountEquity: number
  unrealizedPnl: number
}

// Mock notifications
const mockNotifications = [
  { id: '1', type: 'success', title: 'Order Filled', message: 'Your buy order for 500 shares was filled', time: '2 min ago', read: false },
  { id: '2', type: 'warning', title: 'Drawdown Alert', message: 'You are at 75% of your daily drawdown limit', time: '15 min ago', read: false },
  { id: '3', type: 'info', title: 'Market Update', message: 'New markets available for trading', time: '1 hour ago', read: true },
]

type DropdownType = 'notifications' | 'settings' | 'profile' | null

export function TradingHeader({ accountBalance, accountEquity, unrealizedPnl }: TradingHeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<DropdownType>(null)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [darkMode, setDarkMode] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (dropdown: DropdownType) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown)
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <header className="trading-header">
      <div className="h-full flex items-center justify-between px-4">
        {/* Left: Logo & Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/polyprop_lockup_white_balanced.png"
              alt="PolyProp"
              width={120}
              height={28}
              className="h-6 w-auto"
              priority
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/dashboard" className="px-3 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors rounded hover:bg-surface-elevated/50">
              Dashboard
            </Link>
            <Link href="/trade" className="px-3 py-1.5 text-sm text-accent bg-accent/10 rounded">
              Trade
            </Link>
            <Link href="/history" className="px-3 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors rounded hover:bg-surface-elevated/50">
              History
            </Link>
            <Link href="/analytics" className="px-3 py-1.5 text-sm text-text-muted hover:text-text-primary transition-colors rounded hover:bg-surface-elevated/50">
              Analytics
            </Link>
          </nav>
        </div>

        {/* Center: Account Stats */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-text-muted uppercase tracking-wide">Balance</p>
              <p className="text-sm font-mono text-text-primary tabular-nums">
                ${accountBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-right">
              <p className="text-[10px] text-text-muted uppercase tracking-wide">Equity</p>
              <p className="text-sm font-mono text-text-primary tabular-nums">
                ${accountEquity.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-right">
              <p className="text-[10px] text-text-muted uppercase tracking-wide">P&L</p>
              <p className={clsx('text-sm font-mono tabular-nums', unrealizedPnl >= 0 ? 'text-success' : 'text-error')}>
                {unrealizedPnl >= 0 ? '+' : ''}{unrealizedPnl.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Status & Actions */}
        <div className="flex items-center gap-3" ref={dropdownRef}>
          <div className="status-badge connected">
            <span>Connected</span>
          </div>
          
          <div className="w-px h-6 bg-border" />
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('notifications')}
              className={clsx(
                'p-2 transition-colors rounded relative',
                openDropdown === 'notifications' 
                  ? 'text-text-primary bg-surface-elevated' 
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated/50'
              )}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-error text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {openDropdown === 'notifications' && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[#18181b] border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <h3 className="font-medium text-text-primary">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs text-accent hover:text-accent-hover">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-text-muted text-sm">No notifications</div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={clsx(
                          'px-4 py-3 border-b border-border/50 last:border-0 hover:bg-surface-elevated/50',
                          !notification.read && 'bg-accent/5'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {notification.type === 'success' && <CheckCircle className="w-4 h-4 text-success" />}
                            {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-warning" />}
                            {notification.type === 'info' && <Info className="w-4 h-4 text-accent" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-medium text-text-primary">{notification.title}</p>
                              <button onClick={() => dismissNotification(notification.id)} className="text-text-muted hover:text-text-primary">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-xs text-text-muted mt-0.5">{notification.message}</p>
                            <p className="text-[10px] text-text-muted mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('settings')}
              className={clsx(
                'p-2 transition-colors rounded',
                openDropdown === 'settings' 
                  ? 'text-text-primary bg-surface-elevated' 
                  : 'text-text-muted hover:text-text-primary hover:bg-surface-elevated/50'
              )}
            >
              <Settings className="w-4 h-4" />
            </button>

            {openDropdown === 'settings' && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-[#18181b] border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="font-medium text-text-primary">Quick Settings</h3>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-surface-elevated/50"
                  >
                    <div className="flex items-center gap-3">
                      {darkMode ? <Moon className="w-4 h-4 text-text-muted" /> : <Sun className="w-4 h-4 text-text-muted" />}
                      <span className="text-sm text-text-primary">Dark Mode</span>
                    </div>
                    <div className={clsx('w-8 h-5 rounded-full relative', darkMode ? 'bg-accent' : 'bg-border')}>
                      <div className={clsx('absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform', darkMode ? 'left-3.5' : 'left-0.5')} />
                    </div>
                  </button>
                  <button 
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-surface-elevated/50"
                  >
                    <div className="flex items-center gap-3">
                      {soundEnabled ? <Volume2 className="w-4 h-4 text-text-muted" /> : <VolumeX className="w-4 h-4 text-text-muted" />}
                      <span className="text-sm text-text-primary">Sound Effects</span>
                    </div>
                    <div className={clsx('w-8 h-5 rounded-full relative', soundEnabled ? 'bg-accent' : 'bg-border')}>
                      <div className={clsx('absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform', soundEnabled ? 'left-3.5' : 'left-0.5')} />
                    </div>
                  </button>
                  <div className="my-2 border-t border-border" />
                  <Link href="/settings" onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-elevated/50">
                    <Settings className="w-4 h-4 text-text-muted" />
                    <span className="text-sm text-text-primary">All Settings</span>
                  </Link>
                  <Link href="/help" onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-elevated/50">
                    <HelpCircle className="w-4 h-4 text-text-muted" />
                    <span className="text-sm text-text-primary">Help & Support</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('profile')}
              className={clsx(
                'flex items-center gap-2 pl-2 pr-3 py-1.5 rounded transition-colors',
                openDropdown === 'profile' ? 'bg-surface-elevated' : 'hover:bg-surface-elevated/50'
              )}
            >
              <div className="w-7 h-7 rounded-full bg-surface-elevated flex items-center justify-center">
                <User className="w-4 h-4 text-text-muted" />
              </div>
              <ChevronDown className={clsx('w-3.5 h-3.5 text-text-muted transition-transform', openDropdown === 'profile' && 'rotate-180')} />
            </button>

            {openDropdown === 'profile' && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-[#18181b] border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Demo Trader</p>
                      <p className="text-xs text-text-muted">demo@polyprop.co</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-b border-border bg-surface-elevated/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted">Account Status</span>
                    <span className="text-xs font-medium text-success">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted">Challenge Stage</span>
                    <span className="text-xs font-medium text-accent">Stage 1</span>
                  </div>
                </div>
                <div className="p-2">
                  <Link href="/profile" onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-elevated/50">
                    <User className="w-4 h-4 text-text-muted" />
                    <span className="text-sm text-text-primary">My Profile</span>
                  </Link>
                  <Link href="/billing" onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-surface-elevated/50">
                    <Shield className="w-4 h-4 text-text-muted" />
                    <span className="text-sm text-text-primary">Billing & Plans</span>
                  </Link>
                  <div className="my-2 border-t border-border" />
                  <button 
                    onClick={() => {
                      setOpenDropdown(null)
                      alert('Logout functionality will be implemented with authentication')
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-error/10 text-error"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
