<!DOCTYPE html>
<html lang="en">
<head>
<!--<link rel="icon" href="xxxxxx" type="image/x-icon">-->
<title>QLessDisplay</title>
<meta charset="utf-8">
 <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
<link href="style.css" rel="stylesheet">
<style>
#tablestyle {border:1px solid black;
			}
#optionstyle{ position:relative;
			left:10px;
			top:0px;
			right:50px;
			bottom:100px;
			}

</style>
</head>
<body>
<div id="pagebody">
	
		<h1>Carts</h1><br>
	
		
		<table class="table table-border table-hover ">
				<tr colspan=2>
					
					<td>
						<b>Customer :<b>
					</td>
					
					
				</tr>
				<?php foreach($carts as $cart){ ?>
				<tr colspan=2>
					
					<td>
                                            <a href="<?php echo site_url('api/cart/'.$cart['cart_id']); ?>"><?php echo $cart['user']; ?></a>
					</td>
					
					
				</tr>
                                <?php } ?>
				
		</table>
	</div>
	
</div>

</body>
</html>