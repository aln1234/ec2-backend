import { Request, Response, NextFunction } from "express";

//error builder
import { ApiError } from "../errors/ApiError";

//services
import OrderService from "../services/orderService";
import CartService from "../services/cartService";

//type
import { TOrderBodySchema } from "../types/order";
import { IAuthorizationRequest } from "../types/authorization";

//constant
import { PAYMENT_STATUS } from "../constants/order";
import Stripe from "stripe";
import orderService from "../services/orderService";

const stripe = new Stripe(process.env.STRIPE_KEY as string);

//create stripe checkout
export async function createCheckout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const line_items = req.body.cartItems.map((item: any) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.description,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.count,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },

        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      billing_address_collection: "required",

      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      metadata: {
        userId: req.body.userId,
      },
      success_url: `https://fs16-6-frontend-project-chi.vercel.app//order`,
      cancel_url: `https://fs16-6-frontend-project-chi.vercel.app/cart`,
    });

    res.send({ url: session.url });
  } catch (error: any) {
    console.log(error.message);
    next(ApiError.internal("Internal server error"));
  }
}

//retrieve order
export async function retrieveOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let data;
    let eventType;
    let webhookSecret;

    if (webhookSecret) {
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature as string,
          webhookSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      data = req.body.data.object;
      eventType = req.body.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }
    if (eventType === "checkout.session.completed") {
      const session = data;

      const line_items = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          limit: 100,
        }
      );

      const formattedOrder = {
        orderId: data.id,
        userId: data.metadata.userId,
        address: {
          city: data.customer_details.address.city,
          country: data.customer_details.address.country,
          postalCode: data.customer_details.address.postal_code,
        },
        email: data.customer_details.email,
        name: data.customer_details.name,
        phone: data.customer_details.phone,
        payment: {
          paymentType: data.payment_method_types,
          paymentStatus: data.payment_status,
        },
        products: line_items.data,
        shipmentDetail: data.shipment_details || "",
        subtotal: data.amount_subtotal,
        total: data.amount_total,
      };
      const order = await orderService.createOne(formattedOrder);
      res.json(order);
    }
  } catch (error: any) {
    console.log(error);
    next(ApiError.internal("Internal server error"));
  }
}

//find single order
export async function findOrderByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const order = await OrderService.getOrderByUserId(userId);
    if (!order) {
      next(ApiError.resourceNotFound("Order not found!."));
      return;
    }
    res.json(order);
  } catch (error) {
    next(ApiError.internal("Internal server error"));
  }
}
