/*

{
  "id": 1,
  "name": "Tienda1",
  "email": "jgabis65@gmail.com",
  "roles": [
    "USER_BUSSINESS"
  ],
  "name_url": "Mitienda1",
  "holder": "Gabriel Ballesteros",
  "whatsapp_contact": "3242992274",
  "locality": "Riohacha",
  "shipping_cost": "4000",
  "contact_name": "Gabriel Ballesteros",
  "number_contact": "3242992274",
  "social_media_contact": "GabJS10",
  "category": null,
  "description": null,
  "close_hours": null,
  "open_hours": null,
  "rating": null,
  "delivery_time": null,
  "image_profile": null,
  "image_cover": null
}
*/
import { Sections } from "./products.types"
import { Roles } from "./form.register.types"

export type UserBussines = {
    id: number
    name: string
    email: string
    roles: Roles[]
    name_url: string
    holder: string
    whatsapp_contact: string
    locality: string
    shipping_cost: number
    contact_name: string
    number_contact: string
    social_media_contact: string
    category: string | null
    description: string | null
    close_hours: string | null
    open_hours: string | null
    delivery_time: string | null
    image_profile: string | null
    image_cover: string | null
    qualification: number | null

}

export type store = UserBussines & {sections: Sections[]}