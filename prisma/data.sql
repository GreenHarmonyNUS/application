-- Insert queries for user data with CUID as id and random 8-digit phone numbers
INSERT INTO "User" (id, email, name, gender, "maritalStatus", "volunteerStatus", "preferredName", "preferredCommunication", "preferredStartDate", "birthYear", "residentialArea", roles, "emergencyName", "emergencyRelationship", "emergencyPhone")
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
  (1, 'Central Park', 40.7829, -73.9654, 'A beautiful park in the heart of New York City.'),
  (2, 'Innovation Hub', 37.7749, -122.4194, 'A center for technological innovation and collaboration.'),
  (3, 'Downtown', 40.7128, -74.006, 'The bustling downtown area with a mix of culture and commerce.'),
  (4, 'Art Gallery', 40.7421, -74.006, 'An elegant space showcasing diverse and inspiring artworks.'),
  (5, 'Community Park', 40.7282, -74.0776, 'A community gathering spot surrounded by greenery and nature.'),
  (6, 'City Library', 40.7549, -73.984, 'A haven for book lovers, offering a vast collection of literary treasures.'),
  (7, 'Eco Center', 40.7128, -74.006, 'A hub for promoting and practicing sustainable living.'),
  (8, 'Lincoln Street', 40.7899, -73.9514, 'A vibrant neighborhood street known for its friendly community atmosphere.');

-- Insert queries for events
INSERT INTO "Event" (id, name, "approvalStatus", timestamp, duration, "eventLocationId", image, "userId", details)
VALUES
  (1, 'Community Clean-Up', 'APPROVED', '2024-07-20'::date, 2, 1, '/assets/cleanup-event.jpeg', 'clsa56a7l000008l900esc196', 'Join us in making a positive impact on our environment by participating in the Community Clean-Up event at Central Park. Bring your enthusiasm and commitment to create a cleaner and greener space for everyone. Together, we can make a difference!'),
  (2, 'Tech for Good Workshop', 'APPROVED', '2024-08-15'::date, 3, 2, '/assets/tech-workshop.jpeg', 'clsa4z0ms000008ky2vj3fo25', 'Explore the intersection of technology and social good at our Tech for Good Workshop. Engage in hands-on activities, learn from industry experts, and discover how technology can be a force for positive change. Open to all tech enthusiasts and those curious about the transformative power of innovation.'),
  (3, 'City Marathon', 'APPROVED', '2024-09-05'::date, 1, 3, '/assets/city-marathon.jpeg', 'clsa4zi91000408kydp08ctji', 'Lace up your running shoes and join the City Marathon! Whether you\''re a seasoned runner or just starting, this event promotes health, community spirit, and a love for an active lifestyle. Run through the heart of downtown and be part of the energy that fuels this exhilarating event.'),
  (4, 'Art for Charity', 'APPROVED', '2023-10-10'::date, 2, 4, '/assets/art-charity.jpeg', 'clsa56a7l000008l900esc196', 'Immerse yourself in the world of creativity and philanthropy at the Art for Charity event. Explore exquisite artworks, participate in a charity auction, and support meaningful causes. Art lovers and charity enthusiasts alike, this is an opportunity to celebrate the beauty of giving back.'),
  (5, 'Local Farmers Market', 'APPROVED', '2024-03-15'::date, 2, 5, '/assets/farmers-market.jpeg', 'clsa4z0ms000008ky2vj3fo25', 'Experience the freshness of locally sourced produce at the Local Farmers Market in Community Park. Engage with local farmers, discover sustainable food options, and enjoy a vibrant atmosphere that celebrates community and healthy living.'),
  (6, 'Annual Book Fair', 'APPROVED', '2024-05-20'::date, 4, 6, '/assets/book-fair.jpeg', 'clsa4zi91000408kydp08ctji', 'Dive into the world of literature at the Annual Book Fair held at the City Library. Explore a vast collection of books, engage in literary discussions, and celebrate the joy of reading. This event is a haven for book enthusiasts and those eager to expand their literary horizons.'),
  (7, 'Eco Living Workshop', 'APPROVED', '2024-06-10'::date, 3, 7, '/assets/eco-workshop.jpeg', 'clsa56a7l000008l900esc196', 'Embrace a sustainable lifestyle at the Eco Living Workshop. Gain insights into eco-friendly practices, participate in interactive sessions, and learn how to integrate sustainability into your daily life. Join us in fostering a greener and more mindful community.'),
  (8, 'Neighborhood Block Party', 'APPROVED', '2024-08-30'::date, 3, 8, '/assets/block-party.jpeg', 'clsa4z0ms000008ky2vj3fo25', 'Celebrate the spirit of community at the Neighborhood Block Party on Lincoln Street. Enjoy live music, savor delicious local food, and connect with neighbors in a festive atmosphere. This event promises to be a lively gathering, fostering a sense of belonging and camaraderie.');

-- Insert queries for event_tags
INSERT INTO "EventTag" (name, "eventId") VALUES
  ('environment', 1),
  ('volunteer', 1),
  ('cleanup', 1),
  ('technology', 2),
  ('workshop', 2),
  ('education', 2),
  ('health', 3),
  ('running', 3),
  ('community', 3),
  ('art', 4),
  ('charity', 4),
  ('auction', 4),
  ('local', 5),
  ('food', 5),
  ('sustainability', 5),
  ('books', 6),
  ('education', 6),
  ('community', 6),
  ('sustainability', 7),
  ('workshop', 7),
  ('lifestyle', 7),
  ('community', 8),
  ('music', 8),
  ('food', 8);

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
