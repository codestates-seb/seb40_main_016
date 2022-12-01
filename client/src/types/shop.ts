export interface ItemProps {
  itemId?: number;
  itemImg: string;
  itemName: string;
  price: number;
  stock: number;
  setTotalCost: (arg: (arg: number) => number) => void;
  setSelectedItems: (arg: (arg: OrderItemsProps[]) => OrderItemsProps[]) => void;
}

export interface ItemsProps {
  items: ItemProps[];
  setTotalCost: (arg: (arg: number) => number) => void;
  setSelectedItems: (arg: (arg: OrderItemsProps[]) => OrderItemsProps[]) => void;
}

export interface OrderItemsProps {
  itemId: number;
  quantity: number;
}
