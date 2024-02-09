-- Insert queries for user data with CUID as id and random 8-digit phone numbers
INSERT INTO "User" (id, email, name, gender, "maritalStatus", "volunteerStatus", "preferredName", "preferredCommunication", "preferredStartDate", "birthYear", "residentialDistrict", roles, "emergencyName", "emergencyRelationship", "emergencyPhone")
VALUES
  ('clsa56a7l000008l900esc196', 'user1@example.com', 'John Doe', 'Male', 'Single', 'Active', 'John', 'Telegram', '2024-01-01'::date, 1990, 1, '{"VOLUNTEER", "ORGANISER"}', 'Emergency Contact 1', 'Friend', floor(random() * 90000000 + 10000000)::TEXT),
  ('clsa4z0ms000008ky2vj3fo25', 'user2@example.com', 'Jane Smith', 'Female', 'Married', 'Inactive', 'Jane', 'WhatsApp', '2024-02-15'::date, 1985, 15, '{"ORGANISER"}', 'Emergency Contact 2', 'Spouse', floor(random() * 90000000 + 10000000)::TEXT),
  ('clsa4z5cm000108kyhb1j42sz', 'user3@example.com', 'Alex Johnson', 'Non-Binary', 'Divorced', 'Active', 'Alex', 'Email', '2024-03-30'::date, 1995, 28, '{"PARTICIPANT"}', 'Emergency Contact 3', 'Sibling', floor(random() * 90000000 + 10000000)::TEXT),
  ('clsa5fq5c000008l65fuz17vp', 'user4@example.com', 'Emma Johnson', 'Female', 'Single', 'Active', 'Emma', 'Telegram', '2024-04-10'::date, 1988, 10, '{"VOLUNTEER"}', 'Emergency Contact 4', 'Friend', floor(random() * 90000000 + 10000000)::TEXT),
  ('clsa4zi91000408kydp08ctji', 'user5@example.com', 'Michael Brown', 'Male', 'Married', 'Active', 'Michael', 'WhatsApp', '2024-05-25'::date, 1975, 25, '{"ORGANISER"}', 'Emergency Contact 5', 'Spouse', floor(random() * 90000000 + 10000000)::TEXT),
  ('clsa4zmiz000508kyc7wu0dq3', 'user6@example.com', 'Olivia Miller', 'Female', 'Divorced', 'Inactive', 'Olivia', 'Email', '2024-06-05'::date, 1992, 18, '{"PARTICIPANT"}', 'Emergency Contact 6', 'Sibling', floor(random() * 90000000 + 10000000)::TEXT);

-- Insert queries for eventLocationData
INSERT INTO "EventLocation" (id, name, latitude, longitude, description)
VALUES
  (1, 'Singapore Botanic Gardens', 1.3147, 103.8159, 'A UNESCO World Heritage Site, offering lush greenery and a serene environment for nature lovers.'),
  (2, 'Marina Barrage', 1.2806, 103.8703, 'A reservoir in the heart of the city providing sustainable water supply and a venue for outdoor activities.'),
  (3, 'HortPark', 1.2787, 103.7995, 'A gardening hub that combines recreational gardening with education in a green space.'),
  (4, 'The [email protected]', 1.2823, 103.863, 'A community space that fosters creativity and innovation, with a focus on sustainable living.'),
  (5, 'East Coast Park', 1.3004, 103.9125, 'A scenic coastline park that offers leisure activities while promoting environmental conservation.'),
  (6, 'Library @ Esplanade', 1.2899, 103.8558, 'A resource hub for arts and culture with a commitment to sustainability and education.'),
  (7, 'Green Roof @ Marina Bay Sands', 1.2844, 103.8607, 'An iconic rooftop that showcases innovative sustainable design and urban greenery.'),
  (8, 'Pulau Ubin', 1.4129, 103.9578, 'An island northeast of mainland Singapore, known for its rich natural ecosystems and commitment to preserving traditional ways of life.');

-- Insert queries for events
INSERT INTO "Event" (id, name, "approvalStatus", timestamp, duration, "eventLocationId", image, "userId", details)
VALUES
  (1, 'Botanic Gardens Clean-Up', 'APPROVED', '2024-07-20'::date, 2, 1, '/assets/botanic-cleanup.jpeg', 'clsa56a7l000008l900esc196', 'Join us at the Singapore Botanic Gardens for a day of clean-up to maintain the beauty and serenity of this UNESCO heritage site. Volunteers will help in litter picking, weeding, and other maintenance tasks.'),
  (2, 'Sustainable Living Fair', 'APPROVED', '2024-08-15'::date, 3, 2, '/assets/sustainable-fair.jpeg', 'clsa4z0ms000008ky2vj3fo25', 'Discover sustainable living practices at Marina Barrage. This fair features workshops on upcycling, eco-friendly products, and talks by sustainability experts.'),
  (3, 'Urban Gardening Workshop', 'APPROVED', '2024-09-05'::date, 1, 3, '/assets/gardening-workshop.jpeg', 'clsa4zi91000408kydp08ctji', 'Learn about urban gardening and sustainable horticulture at HortPark. This workshop covers composting, planting techniques, and how to grow your own food in small spaces.'),
  (4, 'Eco-Art Festival', 'APPROVED', '2024-10-10'::date, 2, 4, '/assets/eco-art-festival.jpeg', 'clsa56a7l000008l900esc196', 'Explore the intersection of art and sustainability at The [email protected] This festival showcases eco-friendly art installations and workshops on creating art from recycled materials.'),
  (5, 'Coastal Clean-Up Drive', 'APPROVED', '2024-03-15'::date, 2, 5, '/assets/coastal-cleanup.jpeg', 'clsa4z0ms000008ky2vj3fo25', 'Participate in a coastal clean-up at East Coast Park to help protect marine life and maintain clean beaches. A great way to contribute to environmental preservation.'),
  (6, 'Green Reads Book Club', 'APPROVED', '2024-05-20'::date, 4, 6, '/assets/green-reads.jpeg', 'clsa4zi91000408kydp08ctji', 'Join our book club at Library @ Esplanade, focusing on literature that inspires sustainable living, environmental protection, and awareness.'),
  (7, 'Innovations in Sustainability', 'APPROVED', '2024-06-10'::date, 3, 7, '/assets/sustainability-innovation.jpeg', 'clsa56a7l000008l900esc196', 'Learn about the latest in sustainable design and green technologies on the Green Roof @ Marina Bay Sands. This event includes tours, talks, and showcases of innovative projects.'),
  (8, 'Pulau Ubin Eco Adventure', 'APPROVED', '2024-08-30'::date, 3, 8, '/assets/eco-adventure-ubin.jpeg', 'clsa4z0ms000008ky2vj3fo25', 'Experience the rich biodiversity of Pulau Ubin with guided eco-tours. Learn about conservation efforts and the island’s unique ecosystem.');

-- Insert queries for event_tags
INSERT INTO "EventTag" (name, "eventId") VALUES
  ('environment', 1),
  ('volunteer', 1),
  ('cleanup', 1),
  ('sustainability', 2),
  ('upcycling', 2),
  ('education', 2),
  ('gardening', 3),
  ('sustainability', 3),
  ('workshop', 3),
  ('eco-art', 4),
  ('sustainability', 4),
  ('workshop', 4),
  ('cleanup', 5),
  ('marine conservation', 5),
  ('environment', 5),
  ('sustainability', 6),
  ('reading', 6),
  ('education', 6),
  ('innovation', 7),
  ('sustainability', 7),
  ('technology', 7),
  ('conservation', 8),
  ('adventure', 8),
  ('education', 8);

INSERT INTO "EventRegistrations" ("eventId", participant)
VALUES 
    -- all
    (1, 'clsa56a7l000008l900esc196'),
    (1, 'clsa4z0ms000008ky2vj3fo25'),
    (1, 'clsa4z5cm000108kyhb1j42sz'),
    (1, 'clsa5fq5c000008l65fuz17vp'),
    (1, 'clsa4zi91000408kydp08ctji'),
    (1, 'clsa4zmiz000508kyc7wu0dq3'),
    
    -- first 5
    (2, 'clsa4z0ms000008ky2vj3fo25'),
    (2, 'clsa4z5cm000108kyhb1j42sz'),
    (2, 'clsa5fq5c000008l65fuz17vp'),
    (2, 'clsa4zi91000408kydp08ctji'),
    (2, 'clsa4zmiz000508kyc7wu0dq3'),
    
    -- first 4
    (3, 'clsa4z0ms000008ky2vj3fo25'),
    (3, 'clsa4z5cm000108kyhb1j42sz'),
    (3, 'clsa5fq5c000008l65fuz17vp'),
    (3, 'clsa4zi91000408kydp08ctji'),

    -- last 5
    (4, 'clsa4z0ms000008ky2vj3fo25'),
    (4, 'clsa4z5cm000108kyhb1j42sz'),
    (4, 'clsa5fq5c000008l65fuz17vp'),
    (4, 'clsa4zi91000408kydp08ctji'),
    (4, 'clsa4zmiz000508kyc7wu0dq3'),

    -- last 4
    (5, 'clsa4z5cm000108kyhb1j42sz'),
    (5, 'clsa5fq5c000008l65fuz17vp'),
    (5, 'clsa4zi91000408kydp08ctji'),
    (5, 'clsa4zmiz000508kyc7wu0dq3');

SELECT setval(pg_get_serial_sequence('"Skill"', 'id'), coalesce(max(id)+1, 1), false) FROM "Skill";
SELECT setval(pg_get_serial_sequence('"Metrics"', 'id'), coalesce(max(id)+1, 1), false) FROM "Metrics";
SELECT setval(pg_get_serial_sequence('"Event"', 'id'), coalesce(max(id)+1, 1), false) FROM "Event";
SELECT setval(pg_get_serial_sequence('"EventLocation"', 'id'), coalesce(max(id)+1, 1), false) FROM "EventLocation";
