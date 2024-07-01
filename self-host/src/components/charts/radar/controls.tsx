import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import SkillInfoPopover from "./skill-info-popover"

const initialItems = [
  {
    sku: "GGPC-001",
    stockId: "stock-1",
    stock: 100,
    priceId: "price-1",
    price: 99.99,
    sizeDefault: "s",
  },
  {
    sku: "GGPC-002",
    stockId: "stock-2",
    stock: 143,
    priceId: "price-2",
    price: 99.99,
    sizeDefault: "m",
  },
  {
    sku: "GGPC-003",
    stockId: "stock-3",
    stock: 32,
    priceId: "price-3",
    price: 99.99,
    sizeDefault: "s",
  },
]

const Controls = () => {
  const handleAddVariant = () => {
    // Add your logic to add a new item
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill snapshot</CardTitle>
        <CardDescription className="inline-flex items-center gap-0.5 text-balance ps-2.5">
          <span>latest stats on tech skills I care about. </span>
          <SkillInfoPopover />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[100px]">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">{item.sku}</TableCell>
                <TableCell>
                  <Label htmlFor={item.stockId} className="sr-only">
                    Stock
                  </Label>
                  <Input
                    id={item.stockId}
                    type="number"
                    defaultValue={item.stock}
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor={item.priceId} className="sr-only">
                    Price
                  </Label>
                  <Input
                    id={item.priceId}
                    type="number"
                    defaultValue={item.price}
                  />
                </TableCell>
                <TableCell>
                  <ToggleGroup
                    type="single"
                    defaultValue={item.sizeDefault}
                    variant="outline"
                  >
                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                  </ToggleGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={handleAddVariant}
        >
          <PlusCircle className="size-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Controls
