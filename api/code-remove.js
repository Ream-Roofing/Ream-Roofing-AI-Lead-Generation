{/* <elevenlabs-convai agent-id="Your AI agent ID here" style="display: none;"></elevenlabs-convai>
<script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
 const widget = document.querySelector('elevenlabs-convai');
  widget.style.display = 'block';
  function handleWidgetContent() {
   if (widget.shadowRoot) {
     const poweredByElement = widget.shadowRoot.querySelector('._poweredBy_1f9vw_251');
     if (poweredByElement) {
       poweredByElement.remove();
       return true;
     }
     return false;
   }
   return false;
 }

 const checkInterval = setInterval(() => {
   if (widget.shadowRoot) {
     handleWidgetContent();
   }
 }, 100);
  const observer = new MutationObserver(function(mutations) {
   handleWidgetContent();
 });
  const initObserver = setInterval(() => {
   if (widget.shadowRoot) {
     clearInterval(initObserver);
     observer.observe(widget.shadowRoot, {
       childList: true,
       subtree: true,
       attributes: true
     });
   }
 }, 100);
});
</script>
 */}
