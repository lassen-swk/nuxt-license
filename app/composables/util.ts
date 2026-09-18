export const useUtil = () => {

    const getDaysLeft = (today : Date, expiryDate : Date) => {
        const timeLeft = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
        return timeLeft
    }

    const formatDate = (date: Date) => {
        if (!date) return '—'
        return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }

    function formatFromISO(iso : string) {
  if (!iso) return '—'
  return formatDate(new Date(iso))
}

    return {
        getDaysLeft,
        formatDate,
        formatFromISO
    }
}