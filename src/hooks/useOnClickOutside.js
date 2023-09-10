import React from 'react'
import { useEffect } from 'react'

export default function useOnClickOutside(ref, setOpen) {
    useEffect(() => {
      // Define the listener function to be called on click/touch events
      const listener = (event) => {
        // If the click/touch event originated inside the ref element, do nothing
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }
        // Otherwise, call the provided handler function
        setOpen(false);
      };
  
      // Add event listeners for mousedown and touchstart events on the document
      document.addEventListener("mousedown", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
      };
  
    }, [ref]); // Only run this effect when the ref or handler function changes
  }