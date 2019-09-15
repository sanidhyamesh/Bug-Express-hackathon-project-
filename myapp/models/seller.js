var mongoose = require('mongoose');
var sellerSchema = new mongoose.Schema({
    //===========STATIC===========
    company_name:String,
    email:String,
    contact:String,
    website:String,
    license_number:String,
    // role:String,
    sector:String,
    type:String,
    scale:String,
    username:String,
    password:String,
    company_id:String,
    cdm_id:String,
    user_id:String,
    // z_cc_total:Number,
    // z_projects_total:Number,
    z_eff_total:Number,
    // z_bar:Number,
    // =============DYNAMIC===========
    isEligiblePool:Boolean,
    isEligibleSell:Boolean,
    cc_account:Number,
    cc_added:Number,
    cc_removed:Number,
    cc_total:Number,
    // cc_transact:Number,
    no_pro:Number,
    money_account:Number,
    // money_transact:Number,
    money_removed:Number,
    money_total:Number,
    all_transact:[
        {
            t_id:Number,
            bid:Number,
            cc_transact:Number,
            cc_price:Number,
            timestamp:Date,
            buyer:String,
            money_transact:Number
        }
    ]  
});
module.exports = mongoose.model("seller",sellerSchema);