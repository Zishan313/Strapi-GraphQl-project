import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from 'react-markdown'
const REEVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          title
          rating
          body
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

export default function ReviewDetails() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REEVIEW, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Log the data structure
  console.log("Data:", data.review.data.attributes.categories.data);

  return (
    <div className="review-card">
      <div className="rating">{data.review.data.attributes.rating}</div>
      <h2>{data.review.data.attributes.title}</h2>
      {data.review.data.attributes.categories.data.map((c) => (
        <small key={c.id}>{c.attributes.name}</small>
      ))}
      <ReactMarkdown>
        {data.review.data.attributes.body &&
        data.review.data.attributes.body.length > 0 &&
        data.review.data.attributes.body[0].children &&
        data.review.data.attributes.body[0].children.length > 0
          ? data.review.data.attributes.body[0].children[0].text
          : ""}
      </ReactMarkdown>
    </div>
  );
}
