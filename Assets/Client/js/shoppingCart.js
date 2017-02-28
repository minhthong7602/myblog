var cart = {
    init: function () {
        cart.loadData();
        cart.registerEvent();

    },
    registerEvent: function () {
        $('#btnAddToCart').off('click').on('click', function (e) {

            e.preventDefault();
            var productId = parseInt($(this).data('id'));
            cart.addItem(productId);
        });

        $('#btnContinue').off('click').on('click', function (e) {
            e.preventDefault();
            cart.updateAll();
            window.location.href = "/";
        });

        $('#btnDeleteAll').off('click').on('click', function (e) {
            e.preventDefault();
            var r = confirm("Bạn có chắc chắn xóa giỏ hàng");

            if (r) {
                cart.deleteAllItem();
            }
        });

        $('#btnCheckout').off('click').on('click', function (e) {
            e.preventDefault();
            $('#successCheckCount').hide();
            $('#divCheckout').show();
        });

        $('#btnHideCheckout').off('click').on('click', function (e) {
            e.preventDefault();
            $('#divCheckout').hide();
        });

        $('#chkUserLoginInfo').change(function(e) {
            e.preventDefault();
            if ($(this).is(":checked")) {
                cart.getLoginUser();
            } else {
                $('#txtName').val('');
                $('#txtAddress').val('');
                $('#txtEmail').val('');
                $('#txtPhone').val('');
            } 
        });

        $('#btnSendCheckOut').off('click').on('click', function (e) {
            e.preventDefault();
            var submit = confirm("Bạn có chắc chắn thanh toán");
            if (submit) {
                cart.sendOrder();
            }
           
             
        });

    },
    checkValidate : function() {
        
        if ($('#txtName').val() == '')
        {
            displayError("Bạn chưa nhập tên");
            return false;
        }

        if ($('#txtAddress').val() == '')
        {
            displayError("Bạn chưa nhập địa chỉ");
            return false;
        }

        if ($('#txtEmail').val() == '') {
            displayError("Bạn chưa nhập email");
            return false;
        }

        if ($('#txtPhone').val() == '') {
            displayError("Bạn chưa nhập số điện thoại");
            return false;
        }

        if ($('#txtMessage').val() == '') {
            displayError("Bạn chưa nhập message");
            return false;
        }

        return true;

    },
    sendOrder: function () {
        if (!cart.checkValidate()) {
            return;
        }
        var listQuantity = $('.txtQuantity');
        var orderDetails = [];
        $.each(listQuantity, function (i, item) {
            orderDetails.push({
                ProductID: $(item).data('id'),
                Quantity: $(item).val(),
                OrderID: 0
            });
        });
        var listAmount = $('.amount');
        var total = 0;
        $.each(listAmount, function (i, item) {

            total += parseFloat($(item).text());
        });

        var order = {

            CustomerName: $('#txtName').val(),
            CustomerAddress: $('#txtAddress').val(),
            CustomerEmail: $('#txtEmail').val(),
            CustomerMobile: $('#txtPhone').val(),
            CustomerMessage: $('#txtMessage').val(),
            PaymentMethod: "Thanh toán tiền mặt",
            Status: false,
            OrderDetails: orderDetails,
            TotalOrder: total
        }
        if (orderDetails.length == 0) {
            displayError("Bạn chưa chọn mặt hàng");
            return;
        }

        $.ajax({
            url: '/ShoppingCart/CreateOrder',
            type: 'POST',
            dataType: 'json',
            data: {
                orderViewModel: JSON.stringify(order)
            },
            success: function (res) {
                if (res.status) {
                    cart.deleteAllItem();
                    cart.loadData();
                    $('#txtName').val('');
                    $('#txtAddress').val('');
                    $('#txtEmail').val('');
                    $('#txtPhone').val('');
                    $('#txtMessage').val('');
                    $('#successCheckCount').show();
                    $('#frmCheckOut').hide();
                    displaySuccess("Bạn gửi đơn hàng thành công");
                }
            }

        });
    },
    updateAll: function () {
        var listQuantity = $('.txtQuantity');
        var cartList = [];
        $.each(listQuantity, function (i, item) {
            
            cartList.push({
                productId: $(item).data('id'),
                Quantity: $(item).val()
            });
        });
        $.ajax({
            url: '/ShoppingCart/Update',
            type: 'POST',
            dataType: 'json',
            data: {
                cartData : JSON.stringify(cartList)
            },
            success: function (res) {
                if (res.status) {
                    cart.loadData();
                   
                }
            }

        });
    },
    getLoginUser: function() {
        $.ajax({
            url: '/ShoppingCart/getLoginUser',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.status) {
                    var user = res.data;
                    $('#resultLogin').html("");
                    $('#txtName').val(user.FullName);
                    $('#txtAddress').val(user.Address);
                    $('#txtEmail').val(user.Email);
                    $('#txtPhone').val(user.PhoneNumber);
                } else {
                    displayError("Bạn chưa đăng nhập");
                    $('#resultLogin').html("Bạn chưa đăng nhập");
                   
                }


            }
        });
    },
    getTotalOrder: function () {
        var listAmount = $('.amount');
        var total = 0;
        $.each(listAmount, function (i, item) {

            total += parseFloat($(item).text());
        });

        $('#lblTotalOrder').text(numeral(total).format(0, 0));
    },
    deleteAllItem: function () {
        $.ajax({
            url: '/ShoppingCart/DeleteAll',
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                if (res.status) {
                    cart.loadData();
                }
            }

        });
    },
    addItem: function (productId) {
        $.ajax({
            url: '/ShoppingCart/Add',
            data: {
                productId: productId
            },
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                if (res.status) {
                    displaySuccess("Thêm sản phẩm thành công");
                }
            }

        });
    },
    deleteItem: function (productId) {
        $.ajax({
            url: '/ShoppingCart/DeleteItem',
            data: {
                productId: productId
            },
            type: 'POST',
            dataType: 'json',
            success: function (res) {
                if (res.status) {                
                    cart.loadData();
                } else {                   
                    cart.loadData();
                }
            }

        });
    },
    loadData: function () {
        $.ajax({
            url: '/ShoppingCart/GetAll',
            type: 'GET',
            dataType: 'json',
            success: function (res) {
                if (res.status) {
                    var template = $('#tplCart').html();
                    var html = '';
                    var data = res.data;
                    $.each(data, function (i, item) {

                        html += Mustache.render(template, {
                            ProductId: item.ProductId,
                            ProductName: item.Product.Name,
                            Image: item.Product.Image,
                            Price: item.Product.Price - item.Product.PromotionPrice,
                            PriceF: numeral(item.Product.Price - item.Product.PromotionPrice).format(0, 0),
                            Quantity: item.Quantity,
                            Amount: item.Quantity * (item.Product.Price - item.Product.PromotionPrice)
                        });
                    });

                    $('#cartBody').html(html);

                    if (html == '') {
                        $('#tbCartContent').html('Không có sản phẩm nào trong giỏ hàng');
                    } else {
                        cart.getTotalOrder();
                    }

                }
            }
        });
    }
}
cart.init();
function deleteItem(productId) {

    var r = confirm("Bạn có chắc chắn xóa sản phẩm này trong giỏ hàng");
    if (r) {
        cart.deleteItem(productId);
    }

}

function Change(id) {

    var text = $('#text_' + id);
    var quantity = parseInt($('#text_' + id).val());
    var price = parseInt($('#price_' + id).text());

    cart.updateAll();
    if (isNaN(quantity) == true) {
        $('#amount_' + id).text(0);
        cart.getTotalOrder();
    }
    else {
        var amount = quantity * price;
        $('#amount_' + id).text(amount);
        cart.getTotalOrder();
    }
}

