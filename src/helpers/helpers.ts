import { Cart } from "@/app/cart/action";
import { UserBussines } from "@/types/user_bussines.types";
import {FormDataBuy} from "@/types/form.register.types";
import { ProductType } from "@/types/products.types";
 function getProfileData(data: Partial<UserBussines>) {
    return {
        name: data.name || "",
        email: data.email || "",
        name_url: data.name_url || "",
        holder: data.holder || "",
        whatsapp_contact: data.whatsapp_contact || "",
        locality: data.locality || "",
        contact_name: data.contact_name || "",
        number_contact: data.number_contact || "",
        social_media_contact: data.social_media_contact || "",
        shipping_cost: data.shipping_cost || 0,
    }
}


function getPrincipalData(data: Partial<UserBussines>) {
    return {
        category: data.category || undefined,
        description: data.description || undefined,
        close_hours: data.close_hours || undefined,
        open_hours: data.open_hours || undefined,
        rating: data.qualification || undefined,
        delivery_time: data.delivery_time || 0,
        image_profile: data.image_profile || undefined,
        image_cover: data.image_cover || undefined
    }
    
}


function sendWhatsapp(phoneNumber: string, items: Cart | null, orderDetails: FormDataBuy ) {
    if (phoneNumber && items && orderDetails) {
        const total = items.items.reduce((acc, item) => acc + item.priceTotal!, 0);
        const itemsString = items.items.map((item) => `- ${item.name} x ${item.quantity} x  $${item.priceUnit.toLocaleString()} =  $${item.priceTotal?.toLocaleString()}`).join("\n");
        const message = `Hola, me gustaría realizar un pedido de los siguientes productos:\n\n${ itemsString }
         \n\nInformación de contacto:\n\n
         Nombre: ${orderDetails.name} ${orderDetails.lastName} \n
         Documento: ${orderDetails.document}\n
         Direccion: ${orderDetails.direction} \n
         Tips de envio: ${orderDetails.op1 ? orderDetails.op1 :"Ninguno"}
         
         \n\nObservaciones de pedido: ${orderDetails.op2 ? orderDetails.op2 :"Ninguno"}\n\n

         \n\nTOTAL: $${total.toLocaleString()} + Envío\n\n 

         \n\nMuchas gracias.\n\n

         `;


        const url = `https://wa.me/+57${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }
    

}


function filterProductsBySection(products: ProductType[], section: string[]) {
    
    //this function will filter the products by section

    if (section.length === 0) {
        return products;
    }

    if (products[0].sections) {
                
        
        return products.filter((product) => {
            return product.sections?.some((sectionItem) => section.includes(sectionItem.section.name));
        });
    }
    
    
} 
 

export { getProfileData , getPrincipalData , sendWhatsapp, filterProductsBySection };