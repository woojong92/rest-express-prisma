CREATE TABLE "public"."User" (
    id VARCHAR(50) PRIMARY KEY NOT NULL,
    name VARCHAR (50) NOT NULL,
    username VARCHAR (50) NOT NULL,
    password VARCHAR (255),
    email VARCHAR (255) UNIQUE,
    phone VARCHAR (50) UNIQUE,
    "verifiedEmail" BOOLEAN NOT NULL DEFAULT false,
    "verifiedPhone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP,
    bio VARCHAR (50),
    gender VARCHAR (50), 
    birth VARCHAR (50),
    avatar VARCHAR (255)
);

-- 팔로워
CREATE TABLE "public"."Follower" (
    "userId" VARCHAR (50) PRIMARY KEY NOT NULL,
    "followerId" INTEGER NOT NULL,
    FOREIGN KEY ("followerId") REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."Following" (
    id SERIAL PRIMARY KEY NOT NULL,
    "followingId" INTEGER NOT NULL,
    FOREIGN KEY ("followingId") REFERENCES "public"."User"(id),
);


CREATE TABLE "public"."Post" (
  id VARCHAR(50) PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMP,
  "userId" INTEGER NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "public"."User"(id)
);


CREATE TABLE "public"."Tag" ( 
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE "public"."PostTag" (
  id SERIAL PRIMARY KEY NOT NULL, 
  "postId" INTEGER NOT NULL,
  FOREIGN KEY ("postId") REFERENCES "public"."Post"(id),
  "tagId" INTEGER NOT NULL, 
  FOREIGN KEY ("tagId") REFERENCES "public"."Tag"(id)
);

CREATE TABLE "public"."PostComment" (
    id SERIAL PRIMARY KEY NOT NULL,
    "postId" INTEGER NOT NULL,
    FOREIGN KEY ("postId") REFERENCES "public"."Post"(id),
    "userId" INTEGER NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "public"."User"(id),
    content TEXT,
    depth INTEGER NOT NULL,
    bundleId INTEGER,
    bundleOrder INTEGER,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP
);