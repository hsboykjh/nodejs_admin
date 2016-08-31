
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM base_portfolios',function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('basePortfolios',{page_title:"Base Portfolio - Node.js",data:rows});
         });
         
         console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_basePortfolios',{page_title:"Add Base Portfolio - Node.js"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM base_portfolios WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_basePortfolios',{page_title:"Edit Base Portfolio - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the basePortfolios*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var today = new Date();
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
    		risk_tolerance_level    : input.risk_tolerance_level,
    		security_id : input.security_id,
    		ratio   : input.ratio,
            created_at : today
        };
        
        var query = connection.query("INSERT INTO base_portfolios set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/basePortfolios');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    var today = new Date();
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
    		risk_tolerance_level    : input.risk_tolerance_level,
    		security_id : input.security_id,
    		ratio   : input.ratio,
            created_at : today
        
        };
        
        connection.query("UPDATE base_portfolios set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/basePortfolios');
          
        });
    
    });
};


exports.delete_basePortfolios = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM base_portfolios  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/basePortfolios');
             
        });
        
     });
};

exports.delete_all_basePortfolios = function(req,res){
    
    req.getConnection(function (err, connection) {
       
       connection.query("DELETE FROM base_portfolios", function(err, rows)
       {
           
            if(err)
                console.log("Error deleting : %s ",err );
           
            res.redirect('/basePortfolios');
            
       });
       
    });
};

