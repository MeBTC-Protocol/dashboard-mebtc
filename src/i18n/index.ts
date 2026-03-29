export type Locale = 'de' | 'en'

const strings = {
  de: {
    'wallet.connect':       'Wallet verbinden',
    'wallet.not_connected': 'Nicht verbunden',
    'wallet.wrong_network': 'Falsches Netzwerk',
    'wallet.network_ok':    'Avalanche Fuji',

    'notice.not_connected': 'Wallet nicht verbunden — oben rechts verbinden',
    'notice.wrong_network': 'Falsches Netzwerk — bitte Avalanche Fuji auswählen',

    'ctrl.status':    'Status',
    'ctrl.approvals': 'Approvals',
    'ctrl.tools':     'Werkzeuge',
    'ctrl.protocol':  'Protokoll',

    'card.balances':        'Guthaben',
    'card.claim':           'Auszahlen',
    'card.miner_pricing':   'Miner kaufen & upgraden',
    'card.swap':            'Tauschen',
    'card.liquidity':       'Liquidität',
    'card.staking':         'Staking',
    'card.mining_stats':    'Mining-Statistiken',
    'card.approvals':       'Freigaben',
    'card.miner_scan':      'Miner-Scan',
    'card.engine':          'Engine',
    'card.approval_needed': 'Freigabe erforderlich',

    'meta.price':    'MeBTC Preis',
    'meta.contracts':'Contracts',
    'meta.price_info': [
      'Pool-Preis: aktueller Spotpreis aus den Pair-Reserven (USDC/MeBTC). Reagiert sofort auf Trades.',
      'TWAP: zeitgewichteter Durchschnittspreis aus dem Oracle-Fenster. Stabiler, weniger sprunghaft.',
      'TWAP-Update: passiert bei Claim/Upgrade (max. alle 2h).',
      'Fee-Berechnung: Wenn Fee fresh = ja, wird TWAP für Gebühren genutzt; sonst Fallback auf Pool-Preis.'
    ].join('\n'),
    'meta.fee_fresh': 'Fee fresh',
    'common.yes': 'ja',
    'common.no':  'nein',

    'engine.button':      'Engine',
    'engine.execute':     'Epoch ausführen',
    'engine.close':       'Schließen',
    'engine.description': 'Sammelt angehäufte Gebühren aus den Vaults (MeBTC + USDC) und fügt sie als Liquidität in den Pool ein. Kann von jedem aufgerufen werden — wer es ausführt, löst den Auto-Compound für alle aus.',
  },
  en: {
    'wallet.connect':       'Connect Wallet',
    'wallet.not_connected': 'Not connected',
    'wallet.wrong_network': 'Wrong Network',
    'wallet.network_ok':    'Avalanche Fuji',

    'notice.not_connected': 'Wallet not connected — connect in the top right',
    'notice.wrong_network': 'Wrong network — please select Avalanche Fuji',

    'ctrl.status':    'Status',
    'ctrl.approvals': 'Approvals',
    'ctrl.tools':     'Tools',
    'ctrl.protocol':  'Protocol',

    'card.balances':        'Balances',
    'card.claim':           'Claim',
    'card.miner_pricing':   'Buy & Upgrade Miners',
    'card.swap':            'Swap',
    'card.liquidity':       'Liquidity',
    'card.staking':         'Staking',
    'card.mining_stats':    'Mining Stats',
    'card.approvals':       'Approvals',
    'card.miner_scan':      'Miner Scan',
    'card.engine':          'Engine',
    'card.approval_needed': 'Approval needed',

    'meta.price':    'MeBTC Price',
    'meta.contracts':'Contracts',
    'meta.price_info': [
      'Pool Price: current spot price from Pair reserves (USDC/MeBTC). Reacts immediately to trades.',
      'TWAP: time-weighted average price from the oracle window. More stable, less volatile.',
      'TWAP update: occurs on Claim/Upgrade (max. every 2h).',
      'Fee calculation: if Fee fresh = yes, TWAP is used for fees; otherwise falls back to Pool Price.'
    ].join('\n'),
    'meta.fee_fresh': 'Fee fresh',
    'common.yes': 'yes',
    'common.no':  'no',

    'engine.button':      'Engine',
    'engine.execute':     'Execute Epoch',
    'engine.close':       'Close',
    'engine.description': 'Collects accumulated fees from the vaults (MeBTC + USDC) and adds them as liquidity to the pool. Can be called by anyone — whoever executes it triggers the auto-compound for all holders.',
  },
} as const

export type StringKey = keyof typeof strings.de

export function translate(locale: Locale, key: StringKey): string {
  return strings[locale][key]
}
