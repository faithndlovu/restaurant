-- Rebrand to Savanna Grill.
-- 1. Rename the two house dishes (matched on their description, which did not change).
update public.menu_items set name = 'Savanna Mixed Grill'
  where description like 'Char-grilled steak, pork chop, chicken thigh & wings%';
update public.menu_items set name = 'Savanna Big Breakfast'
  where description like 'Sirloin steak, eggs your way, baked beans%';

-- 2. Point menu images at the new stock photos in /public/images.
--    Only rows still using one of the old local .png files are touched, so any
--    image an admin has since changed through /admin/menu is left alone.
update public.menu_items set image_url = '/images/mixed-grill.jpg'    where name = 'Crispy Chicken Bites'   and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/brunch-plate.jpg'   where name = 'Garden Crisp Salad'     and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/samosas.jpg'        where name = 'Spring Rolls'           and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/mixed-grill.jpg'    where name = 'Savanna Mixed Grill'    and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/breakfast.jpg'      where name = 'Savanna Big Breakfast'  and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/brunch-plate.jpg'   where name = 'Brown Plate Special'    and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/mixed-grill.jpg'    where name = 'Sadza & Beef Stew'      and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/brownie.jpg'        where name = 'Decadent Brownie'       and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/chocolate-cake.jpg' where name = 'Classic Cheesecake'     and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/brunch-plate.jpg'   where name = 'Signature Cappuccino'   and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/milkshake.jpg'      where name = 'Berry Milkshake'        and image_url like '/images/%.png';
update public.menu_items set image_url = '/images/cocktails.jpg'      where name = 'Sunset Mocktail'        and image_url like '/images/%.png';

-- Catch-all: any other row still on an old local .png falls back to a neutral photo.
update public.menu_items set image_url = '/images/brunch-plate.jpg'   where image_url like '/images/%.png';
