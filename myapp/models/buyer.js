var mongoose = require('mongoose');
var buyerSchema = new mongoose.Schema({
    //===========STATIC===========
    company_name:String,
    email:String,
    contact:String,
    website:String,
    license_number:String,
    // role:String,
    sector:String,
    scale:String,
    username:String,
    password:String,
    company_id:String,
    cdm_id:String,
    country:String,
    user_id:String,
    //=========DYNAMIC================
    isEligibleBid:Boolean,
    cc_account:Number,
    cc_added:Number,
    cc_remove:Number,
    cc_total:Number,
    // cc_transact:Number,
    money_account:Number,
    // money_transact:Number,
    money_remove:Number,
    money_total:Number,
    all_transact : [{
        t_id:Number,
        bid: Number,
        cc_price:Number,
        money_transact:Number,
        timestamp:Date,
        pool :[{
            seller_name:String,
            seller_id:Number,
            sellerUserId:String    
             }]
                  }]
    
});
module.exports = mongoose.model("buyer",buyerSchema);
