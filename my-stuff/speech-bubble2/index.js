window.EZTip = window.EZTip || {
  tipDist: 0, // distance from input to tip of arrow
  arrowSize: 0,
  delay: 400, // in milliseconds
  fields: [], // populated on setup
  timers: new Map(),

  setup: function() {
    this.fields = document.querySelectorAll('input[data-tooltip-id]');
    this.tipDist = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tooltip-tip-distance")) || 0;
    this.arrowSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tooltip-arrow-size")) || 10;
    this.fields.forEach(input => {
      const tooltipId = input.getAttribute('data-tooltip-id');
      const tooltip = document.getElementById(tooltipId);

      input.addEventListener('mouseenter', () => {
        clearTimeout(this.timers.get(tooltipId));
        const rect = input.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        tooltip.classList.add('visible');

        // Reset left/top so size is correct for measurement
        tooltip.style.left = "0px";
        tooltip.style.top = "0px";
        const ttRect = tooltip.getBoundingClientRect();

        if (tooltip.classList.contains('side-top')) {
          tooltip.style.left = `${scrollX +rect.left + rect.width/2 - ttRect.width/2}px` //  + "px";
          tooltip.style.top  = scrollY + rect.top - ttRect.height - this.arrowSize - this.tipDist + "px";
        }
        if (tooltip.classList.contains('side-bottom')) {
          tooltip.style.left = scrollX + rect.left + rect.width/2 - ttRect.width/2 + "px";
          tooltip.style.top  = scrollY + rect.bottom + this.arrowSize + this.tipDist + "px";
        }
        if (tooltip.classList.contains('side-left')) {
          tooltip.style.left = scrollX + rect.left - ttRect.width - this.arrowSize - this.tipDist + "px";
          tooltip.style.top  = scrollY + rect.top + rect.height/2 - ttRect.height/2 + "px";
        }
        if (tooltip.classList.contains('side-right')) {
          tooltip.style.left = scrollX + rect.right + this.arrowSize + this.tipDist + "px";
          tooltip.style.top  = scrollY + rect.top + rect.height/2 - ttRect.height/2 + "px";
        }
      });

      input.addEventListener('mouseleave', () => {
        const timeout = setTimeout(() => {
          tooltip.classList.remove('visible');
        }, this.delay);
        this.timers.set(tooltipId, timeout);
      });

      tooltip.addEventListener('mouseenter', () => {
        clearTimeout(this.timers.get(tooltipId));
      });

      tooltip.addEventListener('mouseleave', () => {
        const timeout = setTimeout(() => {
          tooltip.classList.remove('visible');
        }, this.delay);
        this.timers.set(tooltipId, timeout);
      });
    })
  }
};

// Initialize tooltips on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  EZTip.setup();
});
