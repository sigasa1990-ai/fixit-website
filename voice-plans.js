/* ============================================================
   FixIT Voice — Configuración de planes, precios y contacto
   ------------------------------------------------------------
   Este es el ÚNICO lugar donde viven los precios de FixIT Voice.
   La página fixit-voice.html genera sus tarjetas de precios y
   sus botones de WhatsApp a partir de este objeto. Para cambiar
   un precio, los minutos o las características, edita solo aquí.
   ============================================================ */

window.FIXIT_VOICE = {
  whatsappNumber: '526861959581',
  whatsappMessage: 'Hola, quiero una demo de FixIT Voice',
  currency: 'MXN',
  setupFee: 1800, // Implementación inicial, pago único
  plans: [
    {
      id: 'arranque',
      name: 'Arranque',
      minutes: 300,
      price: 1499,
      popular: false,
      features: [
        'Agente de voz con IA 24/7',
        'Toma pedidos y agenda citas',
        'Español mexicano natural',
        'Reporte mensual de llamadas'
      ]
    },
    {
      id: 'negocio',
      name: 'Negocio',
      minutes: 750,
      price: 2999,
      popular: true,
      features: [
        'Todo lo del plan Arranque',
        'Reporte semanal de llamadas',
        'Tono y ritmo personalizados',
        'Soporte prioritario'
      ]
    },
    {
      id: 'profesional',
      name: 'Profesional',
      minutes: 1500,
      price: 5499,
      popular: false,
      features: [
        'Todo lo del plan Negocio',
        'Reporte diario de llamadas',
        'Múltiples sucursales',
        'Soporte dedicado'
      ]
    }
  ]
};
