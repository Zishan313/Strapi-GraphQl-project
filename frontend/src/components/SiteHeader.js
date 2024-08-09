import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
           name
        }
      }
    }
  }
`;

export default function SiteHeader() {

  const{loading , error, data } = useQuery(CATEGORIES)

  // Log the data structure
  console.log("category Data:", data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract categories from the nested structure
  const categories = data.categories.data || [];
  return (
    <div className="site-header">
      <Link to="/">
        <h1>Ninja Reviews</h1>
      </Link>

      <nav className="categories">
        <span>Filter reviews by categories :</span>
        {categories.map(category =>(
          <Link key={category.id} to={`/category/${category.id}`}>
            {category.attributes.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
