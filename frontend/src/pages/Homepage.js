import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REEVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id
        attributes {
          title
          body
          rating
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export default function Homepage() {
  const { loading, error, data } = useQuery (REEVIEWS)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Log the data structure
  console.log("Data:", data);
  //   console.log('Data (stringified):', JSON.stringify(data));

  // Extract reviews from the nested structure
  const reviews = data.reviews.data || [];

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>
          {review.attributes.categories.data.map(c => (
              <small key={c.id}>{c.attributes.name}</small>
            ))}
          <p>
            {review.attributes.body &&
            review.attributes.body.length > 0 &&
            review.attributes.body[0].children &&
            review.attributes.body[0].children.length > 0
              ? review.attributes.body[0].children[0].text.substring(0, 200)
              : ""}
          </p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
