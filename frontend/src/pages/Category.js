import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams, Link } from "react-router-dom";

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
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
      }
    }
  }
`;

export default function Category() {
  const { id } = useParams();

  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const category = data?.category?.data?.attributes || {};
  const reviews = category.reviews?.data || [];

  console.log("Category data:", data);

  return (
    <div>
      <h2>{category.name}</h2>
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
