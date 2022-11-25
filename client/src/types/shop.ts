export interface ItemProps {
  itemId?: number;
  itemImg: string;
  itemName: string;
  price: number;
  stock: number;
  isSubmit: boolean;
  setTotalCost: (arg: (arg: number) => number) => void;
  setSelectedItems: (arg: (arg: OrderItemsProps[]) => OrderItemsProps[]) => void;
}

export interface ItemsProps {
  items: ItemProps[];
  isSubmit: boolean;
  setTotalCost: (arg: (arg: number) => number) => void;
  setSelectedItems: (arg: (arg: OrderItemsProps[]) => OrderItemsProps[]) => void;
}

export interface OrderItemsProps {
  itemId: number;
  quantity: number;
}
