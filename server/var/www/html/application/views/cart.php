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
	
		<h1>Pack List</h1><br>
	
		<h3><u>Order</u></h3>
		<table class="table table-border table-hover ">
				
				
				<tr colspan=2>
					
					<td>
						Product ID
					</td>
					<td>
						Product
					</td>
					<td>
						&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
					</td>
					<td>
						Quantity &nbsp&nbsp
					</td>
					
				</tr>
                                <?php foreach($items as $item){ ?>
				<tr colspan=2>
					<td>
						<?php echo $item['item_id']; ?>
					</td>
					
					<td>
						<?php echo $item['item_name']; ?>
					</td>
					<td>
						&nbsp&nbsp
					</td>
					<td>
						<?php echo $item['cart_quantity']; ?>
					</td>
				</tr>
                                <?php } ?>
		</table>
                <a href="<?php echo site_url('api/complete/'.$id); ?>"><button class="btn btn-primary">Done</button></a>
	</div>
	
</div>

</body>
</html>