-- Point existing menu_items rows at the local images in /public/images.
-- (The original seed used external CDN URLs, which no longer resolve.)
update public.menu_items set image_url = '/images/mixed-grill.jpg'    where name = 'Crispy Chicken Bites';
update public.menu_items set image_url = '/images/brunch-plate.jpg'    where name = 'Garden Crisp Salad';
update public.menu_items set image_url = '/images/samosas.jpg'  where name = 'Spring Rolls';
update public.menu_items set image_url = '/images/mixed-grill.jpg'    where name = 'Savanna Mixed Grill';
update public.menu_items set image_url = '/images/breakfast.jpg'     where name = 'Savanna Big Breakfast';
update public.menu_items set image_url = '/images/brunch-plate.jpg'    where name = 'Brown Plate Special';
update public.menu_items set image_url = '/images/mixed-grill.jpg'    where name = 'Sadza & Beef Stew';
update public.menu_items set image_url = '/images/brownie.jpg' where name = 'Decadent Brownie';
update public.menu_items set image_url = '/images/chocolate-cake.jpg'    where name = 'Classic Cheesecake';
update public.menu_items set image_url = '/images/brunch-plate.jpg'    where name = 'Signature Cappuccino';
update public.menu_items set image_url = '/images/milkshake.jpg' where name = 'Berry Milkshake';
update public.menu_items set image_url = '/images/cocktails.jpg'   where name = 'Sunset Mocktail';
