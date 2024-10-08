export const menuItems = [
  {
    isHeadr: true,
    title: "menu",
  },
  {  
    title: "Dashboard",
    icon: "heroicons:presentation-chart-bar",
    link: "dashboard",
  },
  {  
    title: "Empresa",
    icon: "heroicons:home",
    link: "empresas/editar",
  },
  {
    title: "Productos",
    icon: "heroicons:list-bullet",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle: "Catalogo",
        childlink: "productos",
      },
      {
        childtitle: "Categorías",
        childlink: "categorias",
      },
      {
        childtitle: "Subcategorías",
        childlink: "subcategorias",
      },
      {
        childtitle: "Marcas",
        childlink: "marcas",
      },
      {
        childtitle: "Colores",
        childlink: "colores",
      },
      {
        childtitle: "Tallas",
        childlink: "tallas",
      },

    ],
  },
  
  {
    title: "Almacenes",
    icon: "heroicons:list-bullet",
    link: "almacenes",
  },
  {
    title: "Proveedores",
    icon: "heroicons:user-group",
    link: "proveedores",
  },
  {
    title: "Usuarios",
    icon: "heroicons:user-group",
    link: "usuarios",
  },
  {
    title: "Mensajes",
    icon: "heroicons:chat-bubble-left-right",
    link: "mensajes",
  },
  {
    title: "Ventas",
    icon: "heroicons:banknotes",
    link: "#",
    isHide: true,
    child: [
      /*
      {
        childtitle:"Prepedidos",
        childlink: "ventas/prepedidos",
      },
      {
        childtitle:"Prepedidos por Cliente",
        childlink: "ventas/prepedidos_cliente",
      },
      {
        childtitle:"Alta Prepedido",
        childlink: "ventas/prepedido_alta",
      },
      */
      {
        childtitle:"Punto de venta",
        childlink: "ventas/ventas_alta",
      },
      {
        childtitle: "Códigos descuento",
        childlink: "codigos",
      },
      {
        childtitle: "Historial por Pedido",
        childlink: "ventas/historial_pedidos",
      },
      {
        childtitle: "Historial por Producto",
        childlink: "ventas/historial_ventas",
      },
    ],
  },
  {
    title: "Web",
    icon: "heroicons:globe-alt",
    link: "#",
    isHide: true,
    child: [
      {
        childtitle:"Seo",
        childlink: "seo/editar",
      },
      {
        childtitle:"Faq",
        childlink: "faq",
      },
    ],
  },
];

export const menuItemsPuntoDeVenta = [
  {
    isHeadr: true,
    title: "menu",
  },
  {
    title: "Punto de venta",
    icon: "heroicons:banknotes",
    link: "ventas/ventas_alta",
  },
];

export const menuItemsAlmacen = [
  {
    isHeadr: true,
    title: "menu",
  },
  {
    title: "Almacenes",
    icon: "heroicons:list-bullet",
    link: "almacenes",
  },
];

export const topMenu = [];



import User1 from "@/assets/images/all-img/user.png";
import User2 from "@/assets/images/all-img/user2.png";
import User3 from "@/assets/images/all-img/user3.png";
import User4 from "@/assets/images/all-img/user4.png";
export const notifications = [
  {
    title: "Your order is placed",
    desc: "Amet minim mollit non deser unt ullamco est sit aliqua.",

    image: User1,
    link: "#",
  },
  {
    title: "Congratulations Darlene  🎉",
    desc: "Won the monthly best seller badge",
    unread: true,
    image: User2,
    link: "#",
  },
  {
    title: "Revised Order 👋",
    desc: "Won the monthly best seller badge",

    image: User3,
    link: "#",
  },
  {
    title: "Brooklyn Simmons",
    desc: "Added you to Top Secret Project group...",

    image: User4,
    link: "#",
  },
];

export const message = [
  {
    title: "Wade Warren",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: true,
    notification_count: 1,
    image: User1,
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: User2,
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: User3,
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: User4,
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: User2,
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: User3,
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: User4,
    link: "#",
  },
];

export const colors = {
  primary: "#4669FA",
  secondary: "#A0AEC0",
  danger: "#F1595C",
  black: "#111112",
  warning: "#FA916B",
  info: "#0CE7FA",
  light: "#425466",
  success: "#50C793",
  "gray-f7": "#F7F8FC",
  dark: "#1E293B",
  "dark-gray": "#0F172A",
  gray: "#68768A",
  gray2: "#EEF1F9",
  "dark-light": "#CBD5E1",
};

export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const topFilterLists = [
  {
    name: "Inbox",
    value: "all",
    icon: "uil:image-v",
  },
  {
    name: "Starred",
    value: "fav",
    icon: "heroicons:star",
  },
  {
    name: "Sent",
    value: "sent",
    icon: "heroicons-outline:paper-airplane",
  },

  {
    name: "Drafts",
    value: "drafts",
    icon: "heroicons-outline:pencil-alt",
  },
  {
    name: "Spam",
    value: "spam",
    icon: "heroicons:information-circle",
  },
  {
    name: "Trash",
    value: "trash",
    icon: "heroicons:trash",
  },
];

export const bottomFilterLists = [
  {
    name: "personal",
    value: "personal",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Social",
    value: "social",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Promotions",
    value: "promotions",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Business",
    value: "business",
    icon: "heroicons:chevron-double-right",
  },
];

import meetsImage1 from "@/assets/images/svg/sk.svg";
import meetsImage2 from "@/assets/images/svg/path.svg";
import meetsImage3 from "@/assets/images/svg/dc.svg";
import meetsImage4 from "@/assets/images/svg/sk.svg";

export const meets = [
  {
    img: meetsImage1,
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
  {
    img: meetsImage2,
    title: "Design meeting (team)",
    date: "01 Nov 2021",
    meet: "Skyp meeting",
  },
  {
    img: meetsImage3,
    title: "Background research",
    date: "01 Nov 2021",
    meet: "Google meeting",
  },
  {
    img: meetsImage4,
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
];
import file1Img from "@/assets/images/icon/file-1.svg";
import file2Img from "@/assets/images/icon/pdf-1.svg";
import file3Img from "@/assets/images/icon/zip-1.svg";
import file4Img from "@/assets/images/icon/pdf-2.svg";
import file5Img from "@/assets/images/icon/scr-1.svg";

export const files = [
  {
    img: file1Img,
    title: "Dashboard.fig",
    date: "06 June 2021 / 155MB",
  },
  {
    img: file2Img,
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: file3Img,
    title: "Job portal_app.zip",
    date: "06 June 2021 / 155MB",
  },
  {
    img: file4Img,
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: file5Img,
    title: "Screenshot.jpg",
    date: "06 June 2021 / 155MB",
  },
];
