// Configuración de Tailwind utilizada por la página.
tailwind.config={darkMode:"class",theme:{extend:{colors:{"inverse-on-surface":"#eef0ff","on-surface-variant":"#5c3f40","surface-container-highest":"#dae2fd","surface":"#faf8ff","inverse-primary":"#ffb3b6","background":"#faf8ff","surface-tint":"#be0037","surface-container":"#eaedff","surface-container-high":"#e2e7ff","on-primary-container":"#fffaf9","on-primary-fixed":"#40000c","on-surface":"#131b2e","on-background":"#131b2e","tertiary-fixed":"#ffdadb","outline":"#906f70","surface-container-low":"#f2f3ff","surface-variant":"#dae2fd","on-secondary-fixed-variant":"#5a00c6","on-primary-fixed-variant":"#920028","surface-bright":"#faf8ff","on-tertiary-fixed-variant":"#92002a","secondary-fixed-dim":"#d2bbff","error":"#ba1a1a","on-tertiary-fixed":"#40000d","primary":"#b80035","secondary-fixed":"#eaddff","on-error":"#ffffff","on-error-container":"#93000a","primary-fixed":"#ffdada","primary-container":"#e11d48","on-secondary-fixed":"#25005a","on-secondary-container":"#fffbff","error-container":"#ffdad6","outline-variant":"#e5bdbe","secondary":"#712ae2","on-secondary":"#ffffff","surface-dim":"#d2d9f4","secondary-container":"#8a4cfc","tertiary":"#b70438","tertiary-fixed-dim":"#ffb2b7","on-tertiary":"#ffffff","on-tertiary-container":"#fffaf9","primary-fixed-dim":"#ffb3b6","surface-container-lowest":"#ffffff","on-primary":"#ffffff","inverse-surface":"#283044","tertiary-container":"#db2b4e"},borderRadius:{DEFAULT:"0.25rem",lg:"0.5rem",xl:"0.75rem",full:"9999px"},spacing:{margin:"2rem","space-md":"1rem","gutter-sm":"1rem","space-xl":"2.5rem","space-sm":"0.5rem","margin-sm":"1rem","space-xs":"0.25rem","space-lg":"1.5rem",gutter:"1.5rem"},fontFamily:{"headline-xl":["Syne"],"body-sm":["Plus Jakarta Sans"],"label-lg":["Plus Jakarta Sans"],"body-md":["Plus Jakarta Sans"],"headline-sm":["Syne"],"display-lg-mobile":["Syne"],"body-lg":["Plus Jakarta Sans"],"headline-xl-mobile":["Syne"],"label-md":["Plus Jakarta Sans"],"label-sm":["Plus Jakarta Sans"],"display-lg":["Syne"],"headline-lg":["Syne"],"headline-md":["Syne"]},fontSize:{"headline-xl":["40px",{lineHeight:"48px",letterSpacing:"-0.02em",fontWeight:"700"}],"body-sm":["12px",{lineHeight:"18px",letterSpacing:"0.01em",fontWeight:"400"}],"label-lg":["14px",{lineHeight:"20px",letterSpacing:"0.01em",fontWeight:"600"}],"body-md":["14px",{lineHeight:"22px",letterSpacing:"0em",fontWeight:"400"}],"headline-sm":["18px",{lineHeight:"26px",letterSpacing:"0em",fontWeight:"600"}],"display-lg-mobile":["36px",{lineHeight:"42px",letterSpacing:"-0.02em",fontWeight:"800"}],"body-lg":["16px",{lineHeight:"26px",letterSpacing:"0em",fontWeight:"400"}],"headline-xl-mobile":["28px",{lineHeight:"36px",letterSpacing:"-0.01em",fontWeight:"700"}],"label-md":["12px",{lineHeight:"16px",letterSpacing:"0.02em",fontWeight:"600"}],"label-sm":["11px",{lineHeight:"14px",letterSpacing:"0.04em",fontWeight:"700"}],"display-lg":["56px",{lineHeight:"64px",letterSpacing:"-0.03em",fontWeight:"800"}],"headline-lg":["28px",{lineHeight:"36px",letterSpacing:"-0.01em",fontWeight:"700"}],"headline-md":["22px",{lineHeight:"30px",letterSpacing:"0em",fontWeight:"600"}]}}}};

// Funcionalidad de la página.
function filterSchedule(turn, btn) {
      document.querySelectorAll('.schedule-tab').forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary');
        b.classList.add('bg-surface', 'text-on-surface');
      });
      btn.classList.add('bg-primary', 'text-on-primary');
      btn.classList.remove('bg-surface', 'text-on-surface');

      const rows = document.querySelectorAll('#schedule-rows tr');
      rows.forEach(r => {
        if (turn === 'all' || r.getAttribute('data-turn') === turn) {
          r.style.display = '';
        } else {
          r.style.display = 'none';
        }
      });
    }

    function selectStyle(styleName) {
      const select = document.getElementById('style-select');
      if (select) {
        if (styleName.includes('Urbano')) select.value = 'Urbano';
        if (styleName.includes('Bachata')) select.value = 'Latino';
        if (styleName.includes('Contemporáneo')) select.value = 'Contemporaneo';
        if (styleName.includes('Ballet')) select.value = 'Ballet';
      }
      const anchor = document.getElementById('inscripcion');
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
    }

    function handleReservation(e) {
      e.preventDefault();
      const feedback = document.getElementById('reservation-feedback');
      feedback.classList.remove('hidden');
      e.target.reset();
      setTimeout(() => {
        feedback.classList.add('hidden');
      }, 5000);
    }

    function openCheckout(planName, price) {
      const chatMessages = document.getElementById('chat-messages');
      addChatMessage('user', 'Quiero información para inscribirme en el plan: ' + planName + ' (' + price + ')');
      setTimeout(() => {
        addChatMessage('bot', '¡Excelente elección! El plan ' + planName + ' es ideal. ¿Prefieres completar tu pago online ahora mismo o reservar una visita guiada a los estudios?');
      }, 600);
      const widget = document.getElementById('dance-bot-widget');
      if (widget.classList.contains('translate-y-[calc(100%-48px)]')) {
        toggleBotWidget();
      }
      widget.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    function toggleBotWidget() {
      const body = document.getElementById('bot-body');
      const icon = document.getElementById('bot-toggle-icon');
      if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
        icon.textContent = 'expand_more';
      } else {
        body.classList.add('hidden');
        icon.textContent = 'chat';
      }
    }

    function handleBotSubmit(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const msg = input.value.trim();
      if (!msg) return;
      addChatMessage('user', msg);
      input.value = '';

      setTimeout(() => {
        processBotResponse(msg);
      }, 650);
    }

    function sendQuickReply(reply) {
      addChatMessage('user', reply);
      setTimeout(() => {
        processBotResponse(reply);
      }, 500);
    }

    function processBotResponse(query) {
      const lower = query.toLowerCase();
      let response = '¡Con gusto te asesoramos! Puedes llamarnos directamente al +34 912 345 678 o dejarnos tu número de contacto.';
      if (lower.includes('horario')) {
        response = 'Nuestras clases regulares comienzan a las 10:00 h en turno de mañana y de 17:00 h a 21:30 h en turnos de tarde y noche. ¿Qué estilo te interesa más?';
      } else if (lower.includes('precio') || lower.includes('inscripción')) {
        response = 'Disponemos de pase por clase suelta ($12), Mensual Básico 2 días/semana ($45/mes) e Ilimitado Total ($75/mes). ¡Y tu primera clase de prueba es gratuita!';
      } else if (lower.includes('recepción') || lower.includes('hablar')) {
        response = 'Conectando con María en recepción... También puedes escribirnos a info@bailaconestilo.com o venir a Av. de la Danza 124 (Estudio 3).';
      }
      addChatMessage('bot', response);
    }

    function addChatMessage(sender, text) {
      const container = document.getElementById('chat-messages');
      const wrap = document.createElement('div');
      wrap.className = 'flex items-start gap-2 ' + (sender === 'user' ? 'justify-end' : '');

      if (sender === 'user') {
        wrap.innerHTML = '<div class="bg-primary text-on-primary p-space-sm rounded-lg shadow-sm max-w-[85%] font-body-sm text-body-sm">' + text + '</div>';
      } else {
        wrap.innerHTML = '<div class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] shrink-0 mt-1">B</div><div class="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm max-w-[85%]"><p class="text-on-surface font-body-sm text-body-sm">' + text + '</p><span class="text-[10px] text-on-surface-variant block text-right mt-1">Ahora</span></div>';
      }
      container.appendChild(wrap);
      container.scrollTop = container.scrollHeight;
    }

    function simulateAuth(btn) {
      const originalText = btn.textContent;
      btn.textContent = 'Accediendo...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '¡Bienvenido!';
        btn.classList.add('bg-emerald-600');
        setTimeout(() => {
          document.getElementById('auth-modal').classList.add('hidden');
          btn.textContent = originalText;
          btn.disabled = false;
          btn.classList.remove('bg-emerald-600');
        }, 800);
      }, 700);
    }
