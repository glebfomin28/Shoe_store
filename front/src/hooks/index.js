import {useEffect} from "react";

export const useTooltip = (elRef, closeOpen, action1, action2) => {
  useEffect(() => {
    if (!closeOpen) return;
    const handleClick = e => {
      if (!elRef.current.contains(e.target)
        && !action1.current.contains(e.target)
        && !action2.current.contains(e.target) ) {
        closeOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  },[closeOpen])
}