import { MainLayout } from "components/Layout";
import { Link, useParams } from "react-router-dom";
import { Books } from "../components/Books";
import { OtherProducts } from "../components/OtherProducts";
import Breadcrumbs from "components/Layout/Breadcrumbs";
import { Head } from "components/Head";

export const Products = () => {
  const { slug } = useParams();
  const routes = [{ name: slug, path: `/categories/${slug}` }];

  return (
    <MainLayout page={slug}>
      <Breadcrumbs routes={routes} />
      <Head title={slug?.toUpperCase()} />
      <div className="">
        <div className="w-full h-full">
          {slug === "books" ? (
            //display book levels and products
            <Books />
          ) : (
            //display other products
            <OtherProducts slug={slug} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};
