// Price of a carbon credit
var price_cc = 25;
//type of comp choosen by Buyer
var btype = "All";
// bid no. of credits
var bid = 18000;
// credits in total
var cc_t = 0;
// credits in current pool
var cc_p = 0;
// sum of z bars in current pool
var sum_z_bar_p;
// remainder bid
var re_bid;
// transaction id
var t_id = 0;

// all company objects in a users object
var users = {
	c1 : {
		isEligiblePool : false,
		isEligibleSell: false,
		name: "C1",
		username: "U1",
		password: "P1",
		scale: "M",
		type: "Cement",
		c_id: "101",
		cc_account: 4000,
		cc_added: 4000,
		cc_removed : null,
		cc_total : null,
		cc_transact : null,
		projects: 5,
		z_cc_p: null,
		z_cc_t : null,
		z_pro_t: null,
		z_pro_p: null,
		z_eff_p: null,
		z_eff_t: null,
		z_bar_p: null,
		rank_p: null,
		rank_t: null,
		money_account: 1000,
		money_added: null,
		money_deducted: null,
		money_total_transact : null,
		cc_total_transact : null,
		all_transact : []
	}
}

users.c2 = {
	isEligiblePool : false,
	isEligibleSell: false,
	name: "C2",
	username: "U2",
	password: "P2",
	scale: "S",
	type: "Biogas",
	c_id: "102",
	cc_account: 9000,
	cc_added: 1000,
	cc_removed : null,
	cc_total : null,
	cc_transact : null,
	projects: 6,
	z_cc_t : null,
	z_cc_p :null,
	z_pro_t: null,
	z_pro_p: null,
	z_eff_p: null,
	z_eff_t: null,
	z_bar_p: null,
	rank_p: null,
	rank_t: null,
	money_account: 1000,
	money_added: null,
	money_deducted: null,
	money_total_transact : null,
	cc_total_transact : null,
	all_transact : []
}

users.c3 = {
	isEligiblePool : false,
	isEligibleSell: false,
	name: "C3",
	username: "U3",
	password: "P3",
	scale: "S",
	type: "Agriculture",
	c_id: "103",
	cc_account: 5000,
	cc_added: 5000,
	cc_removed : null,
	cc_total : null,
	cc_transact : null,
	projects: 3,
	z_cc_t : null,
	z_cc_p :null,
	z_pro_t: null,
	z_pro_p: null,
	z_eff_p: null,
	z_eff_t: null,
	z_bar_p: null,
	rank_p: null,
	rank_t: null,
	money_account: 1000,
	money_added: null,
	money_deducted: null,
	money_total_transact : null,
	cc_total_transact : null,
	all_transact : []
}

// Array of all companies
var total = [];
//Array of all eligble companies
var pool = [];
// First element is our default
	pool.push(c0 = {
		isEligiblePool : true,
		isEligibleSell : true,
		name: "equalizer",
		cc_account : 0,
		projects : 0,
		z_cc_t : null,
		z_cc_p :null,
		z_pro_t: null,
		z_pro_p: null,
		z_eff_p: null,
		z_eff_t: null,
		z_bar_p: null,
		
});

for(var key in users) {
	if(users[key].cc_account > 2000){
		users[key].isEligibleSell = true;
		// to be eligible either total.type = btype or btype = "All"
		if(users[key].type === btype || btype === "All"){
	    	users[key].isEligiblePool = true;
	    	//push only the eligible users into pool
	    	pool.push(users[key]);
		}
 	}else{
 		users[key].isEligibleSell = false;
 	}
	 // Push all ojects into total array
    total.push(users[key]);
}

/*###############################*/
function makePool(pool){
	// empty the pool
	var dool = [];
	// First element is our default
	dool.push(c0 = {
		isEligiblePool : true,
		isEligibleSell : true,
		name: "equalizer",
		cc_account : 0,
		projects : 0,
		z_cc_t : null,
		z_cc_p :null,
		z_pro_t: null,
		z_pro_p: null,
		z_eff_p: null,
		z_eff_t: null,
		z_bar_p: null,
		
	});
	for(var i=0; i<pool.length; i++) {
		if(pool[i].cc_account > 0){
			pool[i].isEligibleSell = true;
		    pool[i].isEligiblePool = true;
		    //push only the eligible users into pool
		    dool.push(pool[i]);
		}else{
	 		pool[i].isEligibleSell = false;
	 		pool[i].isEligiblePool = false;
	 	}
	}
	return(dool);
}

/*###############################*/
function get_z_cc(arr){
	// avg, sum of all credits
	var avg_cc, sum_cc = 0;
	// std deviation sample of all credits, sigma in stdev formula
	var stdev_cc, sigma_cc = 0;
	for(var i=0; i<arr.length; i++){
		sum_cc += arr[i].cc_account;
	}
	avg_cc = sum_cc / arr.length;
	// calculation of sigma in stdev_cc
	for(var i=0; i<arr.length; i++){
		sigma_cc += Math.pow((arr[i].cc_account - avg_cc), 2);
	}
	// calculating stdev_cc
	stdev_cc = Math.pow((sigma_cc/(arr.length-1)), 0.5);
	// calculating z_cc for arr members
	if(arr[0].name === "equalizer"){
		for(var i=0; i<arr.length; i++){
		arr[i].z_cc_p = (arr[i].cc_account - avg_cc)/stdev_cc;
	}
	}else{
		for(var i=0; i<arr.length; i++){
		arr[i].z_cc_t = (arr[i].cc_account - avg_cc)/stdev_cc;
		}
	}
	
}
/*###############################*/
function get_z_pro(arr){
	// avg, sum of all projects
	var avg_pro, sum_pro = 0;
	// std deviation sample of all projects, sigma in stdev formula
	var stdev_pro, sigma_pro = 0;
	for(var i=0; i<arr.length; i++){
		sum_pro += arr[i].projects;
	}
	avg_pro = sum_pro / arr.length;
	// calculation of sigma in stdev_pro
	for(var i=0; i<arr.length; i++){
		sigma_pro += Math.pow((arr[i].projects - avg_pro), 2);
	}
	// calculating stdev_pro
	stdev_pro = Math.pow((sigma_pro/(arr.length-1)), 0.5);
	// calculating z_pro for arr members
	if(arr[0].name === "equalizer"){
		for(var i=0; i<arr.length; i++){
		arr[i].z_pro_p = (arr[i].projects - avg_pro)/stdev_pro;
		}
	}else{
		for(var i=0; i<arr.length; i++){
		arr[i].z_pro_t = (arr[i].projects - avg_pro)/stdev_pro;
		}
	}
	
}
/*###############################*/
function get_z_eff(arr){
	for(var i=0; i<arr.length; i++){
		arr[i].z_eff_t = ((0.6 * arr[i].z_cc_t) + (0.4 * arr[i].z_pro_t))/2;
		arr[i].z_eff_p = ((0.6 * arr[i].z_cc_p) + (0.4 * arr[i].z_pro_p))/2;
	}
}
/*###############################*/
function get_z_bar(arr){
	sum_z_bar_p = 0;
	for(var i=0; i<arr.length; i++){
		arr[i].z_bar_p = arr[i].z_eff_p - arr[0].z_eff_p;
		sum_z_bar_p += arr[i].z_bar_p;
	}
}
/*###############################*/
function rank(arr){
	arr.sort((a, b) => (a.z_bar_p < b.z_bar_p) ? 1 : -1)
}
/*###############################*/
function get_z_pool(pool){
	get_z_cc(pool);
	get_z_pro(pool);
	get_z_eff(pool);
	get_z_bar(pool);
	rank(pool);
}
function get_z_total(total){
	get_z_cc(total);
	get_z_pro(total);
	get_z_eff(total);
}
get_z_pool(pool);
get_z_total(total);
/*###############################*/
function transact(buyer, bid, pool){
	re_bid = 0;
	t_id++;
	console.log("Transaction "+ t_id +" Details:");
	for(var i=0; i<pool.length-1; i++){
		var to_deduct = (pool[i].z_bar_p/sum_z_bar_p) * bid;
		if(pool[i].cc_account >= to_deduct){
			pool[i].cc_transact = to_deduct;
			pool[i].cc_account -= to_deduct;
		}else{
			re_bid += (to_deduct - pool[i].cc_account);
			pool[i].cc_transact = pool[i].cc_account;
			pool[i].cc_account = 0;
		}
		pool[i].cc_total_transact += pool[i].cc_transact;
		pool[i].money_total_transact += pool[i].money_added;
		pool[i].money_added = pool[i].cc_transact * price_cc;
		pool[i].money_account += pool[i].money_added;
		console.log(pool[i].name + " : " + pool[i].cc_transact + " x " + price_cc + " = " + pool[i].money_added);
		// push this transaction into all_transactions of the member
		var obj = {};
		obj.transaction_id = t_id;
		obj.credits_transacted = pool[i].cc_transact;
		obj.credits_price = price_cc;
		obj.transaction_amount = pool[i].money_added;
		obj.buyer = buyer;
		pool[i].all_transact.push(obj);
	}
	console.log("Bill = " + ((bid-re_bid) * price_cc));
	if(re_bid === 0){
		console.log("Thank you, the transaction is completed!");
	
	}else{
		var dool = makePool(pool);
		get_z_pool(dool);
		transact(buyer, re_bid, dool);
	}
}
/*###############################*/
for(var i=0; i< total.length; i++){
	cc_t += total[i].cc_account;
}
// Check if bid is valid
for(var i=0; i< pool.length; i++){
	cc_p += pool[i].cc_account;
}
if(bid > cc_p){
	console.log("Lack of credits");
}else if(bid < 1 || (bid%1!==0)){
	console.log("Invalid");
}else{
	console.log("Go ahead!");
	transact("ABC buyer", bid, pool);
	console.log("Total bill = " + (bid*price_cc));
}

/*###############################*/
console.log(users);
console.log(total);
console.log(pool);