public class StockDto implements IStockDto {
private String type;

private Integer quantity;

public StockDto(IStockDto isd){
this.type = isd.getType();
this.quantity = isd.getQuantity();
}

}
