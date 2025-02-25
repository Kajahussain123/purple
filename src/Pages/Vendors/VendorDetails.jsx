import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab } from '@mui/material';
import { useParams } from 'react-router-dom'; // Get vendor ID from URL
import { vendorProducts, vendorCategories } from '../../Services/allApi';

const VendorDetails = () => {
    const { id } = useParams(); // Get vendor ID from URL
    const [tabIndex, setTabIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [vendorName, setVendorName] = useState(""); // Store vendor name

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const productData = await vendorProducts(id);
                if (productData.length > 0) {
                    setProducts(productData);
                    setVendorName(productData[0].vendor_name); // Get vendor name from the first product
                }

                const categoryData = await vendorCategories(id);
                setCategories(categoryData);
            } catch (error) {
                console.error("Failed to fetch vendor details:", error);
            }
        };
        fetchVendorDetails();
    }, [id]);

    return (
        <Box sx={{ padding: 3 }}>
            {/* Vendor Name Heading */}
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                Vendor: {vendorName} (ID: {id})
            </Typography>

            {/* Tabs for Products & Categories */}
            <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} sx={{ marginTop: 3 }}>
                <Tab label="Products" />
                <Tab label="Categories" />
            </Tabs>

            {/* Product Tab */}
            {tabIndex === 0 && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Products</Typography>
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Images</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Offer Price</TableCell>
                                    <TableCell>Discount</TableCell>
                                    <TableCell>Tags</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        {/* Product Images */}
                                        <TableCell>
                                            {product.image_urls.length > 0 ? (
                                                product.image_urls.map((img, index) => (
                                                    <img key={index} src={img.product_image} alt="Product" width="50" height="50" style={{ marginRight: 5 }} />
                                                ))
                                            ) : (
                                                <Typography>No Image</Typography>
                                            )}
                                        </TableCell>

                                        {/* Product Details */}
                                        <TableCell>{product.product_name}</TableCell>
                                        <TableCell>{product.product_description}</TableCell>
                                        <TableCell>{product.category_name}</TableCell>
                                        <TableCell>₹{product.price}</TableCell>
                                        <TableCell>₹{product.offerprice}</TableCell>
                                        <TableCell>{product.discount}%</TableCell>

                                        {/* Tags Section */}
                                        <TableCell>
                                            {product.isofferproduct && <Typography color="success.main">Offer</Typography>}
                                            {product.Popular_products && <Typography color="primary">Popular</Typography>}
                                            {product.newarrival && <Typography color="secondary">New Arrival</Typography>}
                                            {product.trending_one && <Typography color="error">Trending</Typography>}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            {/* Category Tab */}
            {tabIndex === 1 && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Categories</Typography>
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category Image</TableCell>
                                    <TableCell>Category Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            <img src={category.category_image} alt={category.category_name} width="50" height="50" />
                                        </TableCell>
                                        <TableCell>{category.category_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
};

export default VendorDetails;
