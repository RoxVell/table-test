function disableShiftTextSelection() {
  const disableSelectStart = (e: any) => {
    document.onselectstart = () => !(e.key === 'Shift' && e.shiftKey);
  };

  ['keyup','keydown'].forEach((event) => {
    window.addEventListener(event, disableSelectStart);
  });

  return () => {
    document.onselectstart = null;
    
    ['keyup','keydown'].forEach((event) => {
      window.removeEventListener(event, disableSelectStart);
    });
  };
}

export { disableShiftTextSelection };

// function enableShiftTextSelection() {
//   ['keyup','keydown'].forEach((event) => {
//     document.onselectstart = null;
//     window.addEventListener(event, (e) => {
//       document.onselectstart = null;
//     });
//   });
// }

