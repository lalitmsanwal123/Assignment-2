(function () {
    'use strict';

    var ToByList = [  {name : "Banana", price : 3},
                      {name : "Mango", price : 4},
                      {name : "Cherry", price : 6},
                      {name : "PineApple", price : 7}
                   ];
    var BoughtList = [];
    //var BoughtList =[ {name : "Apple", price : 3} ];

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .controller('ShoppingListAddController', ShoppingListAddController)
    .service('ShoppingListService',ShoppingListService)

    //Injecting Service to ToBuyController controller
    ToBuyController.$inject = ['ShoppingListService'];
    function ToBuyController(ShoppingListService) {
      var toBuyCtrl = this;
      toBuyCtrl.shoppingList = ShoppingListService.getItem();
      toBuyCtrl.MarkAsBought = function (index) {
      ShoppingListService.removeItem(index);
      }
    }

    //Injecting service to AlreadyBoughtController controller
    AlreadyBoughtController.$inject = ['ShoppingListService'];
    function AlreadyBoughtController(ShoppingListService) {
      var boughtCtrl = this;
      boughtCtrl.shoppingList = BoughtList;
    }

    //Injecting Service to ShoppingListAddController controller
    ShoppingListAddController.inject = ['ShoppingListService']
    function ShoppingListAddController(ShoppingListService) {
        var ItemAdder = this;
          ItemAdder.itemName ="";
          ItemAdder.itemPrice ="";
          ItemAdder.AddItem = function () {
          ItemAdder.ValidationMessage = "";
          if(ItemAdder.itemName == "" && ItemAdder.itemPrice == "")
          {
            ItemAdder.ValidationMessage = "Both Item Name and Item Price are required!";
            return false;
          }

          ShoppingListService.AddItem(ItemAdder.itemName,ItemAdder.itemPrice);
        }
    }

    ///ShoppingListService service
    function ShoppingListService() {
      var service = this;

      //method adds item to array
      service.AddItem=function (itemName,ItemQuanity) {
        var newItem = {
          name : itemName,
          price : ItemQuanity
        };
       ToByList.push(newItem);
     };

     //method returns entire list
     service.getItem = function () {
       return ToByList;
     }

     //Removes item from one array and adds into another
     service.removeItem = function (index) {
         BoughtList.push(ToByList[index]);
         return ToByList.splice(index,1);
     }
    }


})();
