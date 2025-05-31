# How I Created an Order Matching Engine

Exchanges need an order matching engine to execute the orders. There are two types of orders: **bid (BUY)** and **ask (SELL)**. An order matching engine must be fast, accurate, and capable of handling a large number of transactions.

I built an order matching engine in C++ to simulate this process.

---

## Basic Idea

We have a continuous stream of incoming orders which are of two types: **BUY** and **SELL**. To simulate this, we use two JSON files: `buy.json` and `sell.json`, which represent incoming buy and sell orders respectively.

The data structure we use is a **Red-Black Tree** because it is a self-balancing binary search tree, supports fast insertions and deletions, and requires fewer rotations.

---

## Data Structure

### Visual Representation

![image](/uploads/34cdfe4902d436b6f6ecff6cb4e70d84/image.png)

### Order Class

```cpp
class Order {
public:
    Order(string orderId, string type, float price, float quantity, string token, string orderType);
    void displayOrder();
    string orderId;
    string type;
    float price;
    float quantity;
    string token;
    string orderType;
};
```

Order Details:
- `orderId`: Unique ID of the order.
- `price`: Price per unit of the token.
- `type`: Type of order (Buy/Sell).
- `token`: Cryptocurrency token (e.g., BTC, ETH).
- `quantity`: Quantity of token.
- `orderType`: Type (MKT - Market, LMT - Limit, STP - Stop-Loss).

### Node Class (for Red-Black Tree)

```cpp
class Node {
public:
    Node(Order* order);
    Order* order;
    string color;
    Node* left; 
    Node* right;
    Node* parent;
    Node* uncle();
    bool isOnLeft();
    Node* sibling();
    void moveDown(Node *nParent);
    bool hasRedChild();
};
```

### Orderbook Class

```cpp
class Orderbook {
public:
    Orderbook();
    void insertIntoBuy(Order* order);
    void insertIntoSell(Order* order);
    void inorder();
    Order* getSmallestSellOrder();
    Order* getHighestBuyOrder(string token);
    Node* search(string id);
    void deleteByOrderId(string id);
    void swapColors(Node *x1, Node *x2);
private:
    Node* root;
    Node* NIL;
    void inorderHelper(Node* node, string indent, bool last);
    Node* searchHelper(Node* node, string id);
    Order* getSmallestSellOrderHelper(Node* node);
    void getHighestBuyOrderHelper(Node* node, string token, Node* &highestBuy);
    void leftRotate(Node* x);
    void rightRotate(Node* x);
    void fixInsert(Node* k);
    Node *getRoot();
    void swapOrders(Node *u, Node *v);
    void fixRedRed(Node *x);
    Node* successor(Node *x);
    Node* BSTreplace(Node *x);
    void deleteNode(Node *v);
    void fixDoubleBlack(Node *x);
};
```

---

## Matching Engine Logic

### Flow:

1. Read from `buy.json` and `sell.json`.
2. Parse into Buy and Sell Orderbooks (Red-Black Trees).
3. An infinite while loop powers the engine, performing the following steps repeatedly:
-   Pick the Node with Lowest Sell Order from the sell orderbook and delete it.
-   Find the Node with the Highest Buy Order for the _same token_ from the buy orderbook and delete it.
-   Subtract the sell quantity from the buy quantity.
-   If the buy order still has remaining quantity, reinsert it back into the buy orderbook.
-   After each iteration, write the updated buy and sell orderbooks back to buy.json and sell.json files respectively.

### Visual Representation

![image](/uploads/5e275b8db08143406e0fb3b9e86d842a/image.png)

### Loop Logic:

```cpp
void OrderMatchingEngine(){
    while(true){
        Orderbook BuyOrderbook = ReadFromBuy();
        Orderbook SellOrderbook = ReadFromSell();

        BuyOrderbook.inorder();
        cout << endl;
        SellOrderbook.inorder();
        cout << endl;

        Order* smallestSellOrder = SellOrderbook.getSmallestSellOrder();
        cout << "Smallest Sell Order: " << smallestSellOrder->orderId << endl;
        SellOrderbook.deleteByOrderId(smallestSellOrder->orderId);

        Order* highestBuyOrder = BuyOrderbook.getHighestBuyOrder(smallestSellOrder->token);
        cout << "Highest Buy Order: " << highestBuyOrder->orderId << endl;
        BuyOrderbook.deleteByOrderId(highestBuyOrder->orderId);

        highestBuyOrder->quantity -= smallestSellOrder->quantity;
        BuyOrderbook.insertIntoBuy(highestBuyOrder);

        WriteToBuy();
        WriteToSell();
    }
}

int main(){
    OrderMatchingEngine();
    return 0;
}
```

---

## Final Notes

You can find the source code at _Order Matching Engine_.

### Disclaimer:

This system was designed based on my personal understanding of how an order matching engine could function. It does not represent the exact implementation used in real-world financial exchanges.

In actual exchanges:
- Matching engines prioritize **price discovery**.
- Even a 1-token high-price order may beat a 1000-token low-price one.

This model suits platforms where:
- Bulk/high-value trades are prioritized.
- The goal is to **maximize matched volume**, not necessarily price efficiency.
