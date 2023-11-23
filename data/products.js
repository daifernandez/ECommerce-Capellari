//armado de mock data para productos

// export const mockData = [
//   {
//     title:
//       "Aire Acondicionado Hitachi Split 3200w Frio Calor Inverter Color Blanco ",
//     description: `Lo que tenés que saber de este producto
//     • Capacidad de refrigeración de 3300W.
//     • Capacidad de calefacción de 3350 W.
//     • Frigorías: 2752.
//     • Potencia de refrigeración de 3300W y de calefacción de 3350W.
//     • Potencia nominal: 3200W
//     • Con función deshumidificación.
//     • Eficiencia energética: A++.
//     • Tiene temporizador.`,
//     inStock: 100,
//     price: "$489.203,04",
//     slug: "aire1",
//     image: "aire1.jpg",
//     category: "climatizacion",
//     brand: "Hitachi",
//     rating: 5,
//   },

//   {
//     title:
//       "Aire acondicionado Hisense split frío/calor 2300 frigorías blanco 220V AS09HR4SYRKG00N",
//     description: `Lo que tenés que saber de este producto:
//     • Capacidad de refrigeración de 2750W.
//     • Capacidad de calefacción de 2500 W.
//     • Frigorías: 2300.
//     • Potencia de refrigeración de 840W y de calefacción de 693W.
//     • Con función deshumidificación.
//     • Eficiencia energética: A.
//     • Cuenta con función de dormir.
//     • Incluye control remoto.
//     • Dimensiones de la unidad externa: 660mm de ancho x 482mm de alto x 240mm de profundidad.
//     • Dimensiones de la unidad interna: 890mm de ancho x 260mm de alto x 203mm de profundidad.
//     • Tiene temporizador.`,
//     inStock: 100,
//     price: "$424.999,00",
//     slug: "aire2",
//     image: "aire2.jpg",
//     category: "climatizacion",
//     brand: "Hisense",
//     rating: 4.8,
//   },
//   {
//     title:
//       "Aire acondicionado BGH Silent Air split frío/calor 2300 frigorías blanco 220V BS26WCC",
//     description: `Lo que tenés que saber de este producto:
//     • Capacidad de refrigeración de 2700W.
//     • Capacidad de calefacción de 2650 W.
//     • Frigorías: 2300.
//     • Potencia de refrigeración de 830W y de calefacción de 735W.
//     • Con función deshumidificación.
//     • Eficiencia energética: A.
//     • Cuenta con función de dormir.
//     • Incluye control remoto.
//     • Dimensiones de la unidad externa: 720mm de ancho x 495mm de alto x 270mm de profundidad.
//     • Dimensiones de la unidad interna: 722mm de ancho x 290mm de alto x 187mm de profundidad.
//     • Tiene temporizador.`,
//     inStock: 100,
//     price: "$425.999",
//     slug: "aire3",
//     image: "aire3.jpg",
//     category: "climatizacion",
//     brand: "BGH",
//     rating: 4.8,
//   },
//   {
//     title: `Ventilador 3 en 1 Kanji KJH-FH1209 turbo negro con 3 palas de metal, 18" de diámetro 220 V`,
//     description: `Lo que tenés que saber de este producto
//     • Se ajusta a diferentes alturas.
//     • Ventilador de 3 velocidades.
//     • Potencia de 80 W.
//     • Ideal para refrigerar.`,
//     inStock: 100,
//     price: "$29.784",
//     slug: "ventilador1",
//     image: "ventilador1.jpg",
//     category: "climatizacion",
//     brand: "Kanji",
//     rating: 4.4,
//   },
//   {
//     title:
//       "Heladera inverter no frost Whirlpool French Door WRO85AK acero inoxidable con freezer 554L 220V",
//     description: `Lo que tenés que saber de este producto
//     • Tipo de deshielo: no frost.
//     •  Capacidad de 554 litros.
//     • Con freezer inferior.
//     • Eficiencia energética A.
//     • Con iluminación interior.
//     • Dimensiones: 83.6 cm de ancho, 186.4 cm de alto y 79.3 cm de profundidad.
//     • Las imágenes pueden ser ilustrativas.`,
//     inStock: 100,
//     price: "$1.627.299",
//     slug: "heladera1",
//     image: "heladera1.jpg",
//     category: "refrigeracion",
//     brand: "Whirpool",
//     rating: 4.9,
//   },
//   {
//     title: "Heladera Philco Phnt458x No Frost 405lts Inox",
//     description: `Lo que tenés que saber de este producto
//     • Tipo de deshielo: no frost.
//     • Capacidad de 405 litros.
//     • Con freezer superior.
//     • Eficiencia energética A.
//     • Con iluminación interior.
//     • Dimensiones: 70 cm de ancho, 170 cm de alto y 68 cm de profundidad.`,
//     inStock: 100,
//     price: "$378.999",
//     slug: "heladera2",
//     image: "heladera2.jpg",
//     category: "refrigeracion",
//     brand: "Philco",
//     rating: 4.5,
//   },
//   {
//     title: "Heladera Bajo Mesada Philco Phbm093b 90 L Blanca",
//     description: `Lo que tenés que saber de este producto
//     Modelo detallado: PHBM093B.
//     • Tipo de deshielo: cycle defrost.
//     • Capacidad de 83 litros.
//     • Eficiencia energética A+.
//     • Posee puerta reversible.
//     • Dimensiones: 45.5 cm de ancho, 84.5 cm de alto y 42.5 cm de profundidad.
//     • Las imágenes pueden ser ilustrativas.`,
//     inStock: 100,
//     price: "$19.999",
//     slug: "heladera3",
//     image: "heladera3.jpg",
//     category: "refrigeracion",
//     brand: "Philco",
//     rating: 4.7,
//   },
//   {
//     title: "Lavarropas automático Whirlpool WNQ70AB inverter blanco 7kg 220 V",
//     description: `Lo que tenés que saber de este producto
//     • Carga frontal de 7 kg.
//     • Centrifuga a una velocidad de 1200 rpm.
//     • Apto para lavar con agua a diversas temperaturas.
//     • Filtro atrapa pelusas.
//     • Eficiencia energética A++.
//     • Las imágenes pueden ser ilustrativas.
//     • Comodidad y practicidad para tu hogar.`,
//     inStock: 100,
//     price: "$595.750",
//     slug: "lavarropas1",
//     image: "lavarropas1.jpg",
//     category: "lavarropas",
//     brand: "whirpool",
//     rating: 4.7,
//   },
//   {
//     title: "Lavarropas automático Drean Next 6.06 Eco 6kg blanco 220V",
//     description: `Lo que tenés que saber de este producto
//     • Carga frontal de 6 kg.
//     • Centrifuga a una velocidad de 600 rpm.
//     • Apto para lavar con agua a diversas temperaturas.
//     • Filtro atrapa pelusas.
//     • Eficiencia energética A.
//     • Las imágenes pueden ser ilustrativas.
//     • Comodidad y practicidad para tu hogar.`,
//     inStock: 100,
//     price: "$449.999",
//     slug: "lavarropas2",
//     image: "lavarropas2.jpg",
//     category: "lavarropas",
//     brand: "Drean",
//     rating: 4.7,
//   },
// ];
