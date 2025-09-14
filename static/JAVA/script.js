// Crop Disease Detector - Smart Farming System JavaScript

// Global variables
let charts = {};
let currentPeriod = '24h';
let historicalData = [];
let alertThresholds = {
    temperature: { min: 15, max: 35 },
    humidity: { min: 30, max: 90 },
    airQuality: { min: 0, max: 100 },
    cropHealth: { min: 0, max: 100 }
};

// Test function to verify all sections exist
function testSections() {
    const sections = ['home', 'dashboard', 'crop-detection', 'reports', 'about'];
    
    console.log('Testing sections...');
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            console.log(`✓ Section '${sectionId}' found`);
        } else {
            console.error(`✗ Section '${sectionId}' NOT found`);
        }
    });
    
    // Test navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    console.log(`Found ${navLinks.length} navigation links`);
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            console.log(`✓ Nav link '${href}' points to existing section`);
        } else {
            console.error(`✗ Nav link '${href}' points to missing section`);
        }
    });
}

// Simple navigation test
function testNavigation() {
    console.log('Testing navigation...');
    
    // Test clicking each nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        console.log(`Testing nav link ${index + 1}:`, link.textContent.trim());
        
        // Simulate click
        link.click();
        
        // Check if section is active
        const href = link.getAttribute('href');
        const targetId = href.substring(1);
        const section = document.getElementById(targetId);
        
        if (section && section.classList.contains('active')) {
            console.log(`✓ ${targetId} section is active`);
        } else {
            console.error(`✗ ${targetId} section is not active`);
        }
    });
    
    // Test manual section switching
    console.log('Testing manual section switching...');
    const sections = ['home', 'dashboard', 'crop-detection', 'reports', 'about'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Remove all active classes
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            // Add active to this section
            section.classList.add('active');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
            
            console.log(`✓ Manually activated ${sectionId} section`);
        }
    });
}

// Add navigation test to initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Crop Disease Detector application initializing...');
    
    // Test sections first
    testSections();
    
    initializeNavigation();
    initializeHeroButtons();
    initializeCharts();
    initializeCropDetection();
    initializeReports();
    initializeRealTimeData();
    initializeAlerts();
    startDataSimulation();
    populateHistoricalData();
    
    // Test navigation after a short delay
    setTimeout(() => {
        testNavigation();
    }, 1000);
    
    console.log('Crop Disease Detector application initialized successfully!');
    
    // Make testing functions available globally
    window.testSections = testSections;
    window.testNavigation = testNavigation;
    window.switchToSection = switchToSection;
    window.showDebugPanel = function() {
        document.getElementById('debugPanel').style.display = 'block';
    };
    
    // Show debug panel on double-click
    document.addEventListener('dblclick', function() {
        document.getElementById('debugPanel').style.display = 'block';
    });
    
    // Test all sections after initialization
    setTimeout(() => {
        console.log('=== FINAL TESTING ===');
        testSections();
        testNavigation();
        
        // Test each section individually
        ['home', 'dashboard', 'crop-detection', 'reports', 'about'].forEach(sectionId => {
            console.log(`Testing ${sectionId}...`);
            switchToSection(sectionId);
        });
        
        // Return to home
        switchToSection('home');
    }, 2000);
});

// Initialize hero buttons
function initializeHeroButtons() {
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('href').substring(1);
            const section = document.getElementById(targetSection);
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.section');
            
            if (section) {
                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${targetSection}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
                
                // Show section
                section.classList.add('active');
                console.log('Switching to section from hero button:', targetSection);
            }
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    console.log('Initializing navigation...');
    console.log('Found nav links:', navLinks.length);
    console.log('Found sections:', sections.length);

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navigation link clicks
    navLinks.forEach((link, index) => {
        console.log(`Setting up nav link ${index + 1}:`, link.getAttribute('href'));
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('Nav link clicked:', this.getAttribute('href'));
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = this.getAttribute('href').substring(1);
            const section = document.getElementById(targetSection);
            
            console.log('Target section:', targetSection);
            console.log('Section element:', section);
            
            if (section) {
                section.classList.add('active');
                console.log('✓ Successfully switched to section:', targetSection);
                
                // Scroll to top of page
                window.scrollTo(0, 0);
            } else {
                console.error('✗ Section not found:', targetSection);
            }
            
            // Close mobile menu
            if (navToggle) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Handle footer navigation links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('href').substring(1);
            const section = document.getElementById(targetSection);
            
            if (section) {
                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${targetSection}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
                
                // Show section
                section.classList.add('active');
                console.log('Switching to section from footer:', targetSection);
                
                // Scroll to top of page
                window.scrollTo(0, 0);
            }
        });
    });
    
    console.log('Navigation initialization complete');
}

// Chart initialization
function initializeCharts() {
    console.log('Initializing charts...');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded! Charts will not work.');
        return;
    }
    
    console.log('Chart.js library loaded successfully');
    
    // Environment Chart
    const envCtx = document.getElementById('environmentChart');
    if (envCtx) {
        console.log('Creating environment chart...');
        charts.environment = new Chart(envCtx, {
            type: 'line',
            data: {
                labels: generateTimeLabels(currentPeriod),
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        data: generateTemperatureData(currentPeriod),
                        borderColor: '#ff7f50',
                        backgroundColor: 'rgba(255, 127, 80, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Humidity (%)',
                        data: generateHumidityData(currentPeriod),
                        borderColor: '#87ceeb',
                        backgroundColor: 'rgba(135, 206, 235, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Soil Moisture (%)',
                        data: generateSoilMoistureData(currentPeriod),
                        borderColor: '#4a7c59',
                        backgroundColor: 'rgba(74, 124, 89, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Field Charts
    initializeFieldCharts();
    
    // Yield Prediction Chart
    initializeYieldChart();
}

// Initialize field-specific charts
function initializeFieldCharts() {
    const fields = ['A', 'B', 'C'];
    
    fields.forEach(field => {
        const ctx = document.getElementById(`field${field}Chart`);
        if (ctx) {
            charts[`field${field}`] = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Healthy', 'Moderate', 'Poor'],
                    datasets: [{
                        data: generateFieldHealthData(field),
                        backgroundColor: [
                            '#28a745',
                            '#ffc107',
                            '#dc3545'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 15
                            }
                        }
                    }
                }
            });
        }
    });
}

// Initialize yield prediction chart
function initializeYieldChart() {
    const yieldCtx = document.getElementById('yieldChart');
    if (yieldCtx) {
        charts.yield = new Chart(yieldCtx, {
            type: 'bar',
            data: {
                labels: ['Tomatoes', 'Wheat', 'Corn'],
                datasets: [{
                    label: 'Predicted Yield (tons)',
                    data: [2.8, 4.2, 1.9],
                    backgroundColor: [
                        'rgba(74, 124, 89, 0.8)',
                        'rgba(244, 164, 96, 0.8)',
                        'rgba(45, 80, 22, 0.8)'
                    ],
                    borderColor: [
                        '#4a7c59',
                        '#f4a460',
                        '#2d5016'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Chart period controls
function initializeChartControls() {
    const periodButtons = document.querySelectorAll('.chart-controls .btn-small');
    
    periodButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            periodButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current period
            currentPeriod = this.getAttribute('data-period');
            
            // Update chart data
            updateEnvironmentChart();
        });
    });
}

// Update environment chart based on selected period
function updateEnvironmentChart() {
    if (charts.environment) {
        charts.environment.data.labels = generateTimeLabels(currentPeriod);
        charts.environment.data.datasets[0].data = generateTemperatureData(currentPeriod);
        charts.environment.data.datasets[1].data = generateHumidityData(currentPeriod);
        charts.environment.data.datasets[2].data = generateSoilMoistureData(currentPeriod);
        charts.environment.update();
    }
}

// Real-time data simulation
function initializeRealTimeData() {
    // Update stats every 5 seconds
    setInterval(updateStats, 5000);
    
    // Update charts every 30 seconds
    setInterval(updateCharts, 30000);
}

// Update dashboard stats
function updateStats() {
    const sensors = {
        temperature: document.getElementById('temperature'),
        humidity: document.getElementById('humidity'),
        'air-quality': document.getElementById('air-quality'),
        'crop-health': document.getElementById('crop-health')
    };
    
    const statusElements = {
        temperature: document.getElementById('temp-status'),
        humidity: document.getElementById('humidity-status'),
        'air-quality': document.getElementById('air-status'),
        'crop-health': document.getElementById('crop-status')
    };
    
    const indicators = {
        temperature: document.getElementById('temp-indicator'),
        humidity: document.getElementById('humidity-indicator'),
        'air-quality': document.getElementById('air-indicator'),
        'crop-health': document.getElementById('crop-indicator')
    };
    
    // Simulate real-time data changes
    Object.keys(sensors).forEach(key => {
        if (sensors[key]) {
            const currentValue = parseFloat(sensors[key].textContent);
            const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
            let newValue;
            
            switch(key) {
                case 'temperature':
                    newValue = Math.max(15, Math.min(35, currentValue + change));
                    sensors[key].textContent = `${newValue.toFixed(1)}°C`;
                    updateSensorStatus(statusElements[key], indicators[key], newValue, 'temperature');
                    break;
                case 'humidity':
                    newValue = Math.max(30, Math.min(90, currentValue + change));
                    sensors[key].textContent = `${newValue.toFixed(0)}%`;
                    updateSensorStatus(statusElements[key], indicators[key], newValue, 'humidity');
                    break;
                case 'air-quality':
                    newValue = Math.max(50, Math.min(150, currentValue + change * 5));
                    sensors[key].textContent = `${newValue.toFixed(0)} AQI`;
                    updateSensorStatus(statusElements[key], indicators[key], newValue, 'air-quality');
                    break;
                case 'crop-health':
                    newValue = Math.max(40, Math.min(100, currentValue + change));
                    sensors[key].textContent = `${newValue.toFixed(0)}%`;
                    updateSensorStatus(statusElements[key], indicators[key], newValue, 'crop-health');
                    break;
            }
        }
    });
}

function updateSensorStatus(statusElement, indicatorElement, value, sensorType) {
    if (!statusElement || !indicatorElement) return;
    
    let status, statusClass, indicatorClass;
    
    switch(sensorType) {
        case 'temperature':
            if (value < 20) {
                status = 'Low';
                statusClass = 'warning';
                indicatorClass = 'warning';
            } else if (value > 30) {
                status = 'High';
                statusClass = 'warning';
                indicatorClass = 'warning';
            } else {
                status = 'Normal';
                statusClass = 'normal';
                indicatorClass = 'good';
            }
            break;
        case 'humidity':
            if (value < 40) {
                status = 'Low';
                statusClass = 'warning';
                indicatorClass = 'warning';
            } else if (value > 80) {
                status = 'High';
                statusClass = 'warning';
                indicatorClass = 'warning';
            } else {
                status = 'Normal';
                statusClass = 'normal';
                indicatorClass = 'good';
            }
            break;
        case 'air-quality':
            if (value > 100) {
                status = 'Poor';
                statusClass = 'warning';
                indicatorClass = 'danger';
            } else if (value > 80) {
                status = 'Moderate';
                statusClass = 'warning';
                indicatorClass = 'warning';
            } else {
                status = 'Good';
                statusClass = 'good';
                indicatorClass = 'good';
            }
            break;
        case 'crop-health':
            if (value < 60) {
                status = 'Poor';
                statusClass = 'warning';
                indicatorClass = 'danger';
            } else if (value < 80) {
                status = 'Fair';
                statusClass = 'warning';
                indicatorClass = 'warning';
            } else {
                status = 'Healthy';
                statusClass = 'good';
                indicatorClass = 'good';
            }
            break;
    }
    
    statusElement.textContent = status;
    statusElement.className = `sensor-status ${statusClass}`;
    indicatorElement.className = `sensor-indicator ${indicatorClass}`;
}

// Update charts with new data
function updateCharts() {
    if (charts.environment) {
        // Add new data point and remove oldest
        charts.environment.data.labels.push(new Date().toLocaleTimeString());
        charts.environment.data.labels.shift();
        
        charts.environment.data.datasets.forEach(dataset => {
            const lastValue = dataset.data[dataset.data.length - 1];
            const change = (Math.random() - 0.5) * 4;
            dataset.data.push(Math.max(0, lastValue + change));
            dataset.data.shift();
        });
        
        charts.environment.update('none');
    }
}

// Crop Detection functionality
function initializeCropDetection() {
    console.log('Initializing crop detection...');
    
    const imageInput = document.getElementById('imageInput');
    const uploadArea = document.getElementById('uploadArea');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const detectBtn = document.getElementById('detectBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultsSection = document.getElementById('resultsSection');

    console.log('Crop detection elements found:');
    console.log('- imageInput:', !!imageInput);
    console.log('- uploadArea:', !!uploadArea);
    console.log('- imagePreview:', !!imagePreview);
    console.log('- previewImg:', !!previewImg);
    console.log('- detectBtn:', !!detectBtn);
    console.log('- clearBtn:', !!clearBtn);
    console.log('- resultsSection:', !!resultsSection);

    if (!imageInput || !uploadArea || !detectBtn) {
        console.error('Critical crop detection elements not found!');
        return;
    }

    // File input change
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                uploadArea.style.display = 'none';
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImg.src = e.target.result;
                    uploadArea.style.display = 'none';
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // Detect button
    detectBtn.addEventListener('click', function() {
        detectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting...';
        detectBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            const results = simulateCropDetection();
            displayDetectionResults(results);
            detectBtn.innerHTML = '<i class="fas fa-search"></i> Detect Disease';
            detectBtn.disabled = false;
        }, 2000);
    });

    // Clear button
    clearBtn.addEventListener('click', function() {
        imageInput.value = '';
        uploadArea.style.display = 'block';
        imagePreview.style.display = 'none';
        resultsSection.style.display = 'none';
    });
}

function simulateCropDetection() {
    const cropTypes = ['Tomato', 'Wheat', 'Corn', 'Potato', 'Rice'];
    const healthStatuses = ['Healthy', 'Diseased'];
    const suggestions = {
        'Healthy': 'Continue regular watering and monitoring',
        'Diseased': 'Apply fungicide treatment and improve air circulation'
    };
    
    const cropType = cropTypes[Math.floor(Math.random() * cropTypes.length)];
    const healthStatus = healthStatuses[Math.floor(Math.random() * healthStatuses.length)];
    const confidence = Math.floor(Math.random() * 20) + 80; // 80-100%
    
    return {
        cropType,
        healthStatus,
        confidence,
        suggestedAction: suggestions[healthStatus]
    };
}

function displayDetectionResults(results) {
    document.getElementById('cropType').textContent = results.cropType;
    document.getElementById('healthStatus').innerHTML = 
        `<span class="status-badge ${results.healthStatus.toLowerCase()}">${results.healthStatus}</span>`;
    document.getElementById('confidence').textContent = `${results.confidence}%`;
    document.getElementById('suggestedAction').textContent = results.suggestedAction;
    
    document.getElementById('resultsSection').style.display = 'block';
}

// Reports functionality
function initializeReports() {
    console.log('Initializing reports...');
    
    const exportCSV = document.getElementById('exportCSV');
    const exportPDF = document.getElementById('exportPDF');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const dataTableBody = document.getElementById('dataTableBody');

    console.log('Reports elements found:');
    console.log('- exportCSV:', !!exportCSV);
    console.log('- exportPDF:', !!exportPDF);
    console.log('- startDate:', !!startDate);
    console.log('- endDate:', !!endDate);
    console.log('- dataTableBody:', !!dataTableBody);

    if (!exportCSV || !exportPDF || !dataTableBody) {
        console.error('Critical reports elements not found!');
        return;
    }

    // Set default dates
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    startDate.value = lastWeek.toISOString().split('T')[0];
    endDate.value = today.toISOString().split('T')[0];

    // Export CSV
    exportCSV.addEventListener('click', function() {
        exportToCSV();
    });

    // Export PDF
    exportPDF.addEventListener('click', function() {
        exportToPDF();
    });

    // Date range change
    startDate.addEventListener('change', filterData);
    endDate.addEventListener('change', filterData);
}

function populateHistoricalData() {
    const tableBody = document.getElementById('dataTableBody');
    const now = new Date();
    
    // Generate sample historical data
    for (let i = 0; i < 50; i++) {
        const date = new Date(now.getTime() - i * 60 * 60 * 1000); // Every hour
        const data = {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
            temperature: (Math.random() * 20 + 15).toFixed(1),
            humidity: (Math.random() * 40 + 40).toFixed(0),
            airQuality: (Math.random() * 50 + 50).toFixed(0),
            cropHealth: (Math.random() * 30 + 70).toFixed(0),
            status: Math.random() > 0.8 ? 'Warning' : 'Normal'
        };
        
        historicalData.push(data);
    }
    
    updateDataTable();
}

function updateDataTable() {
    const tableBody = document.getElementById('dataTableBody');
    tableBody.innerHTML = '';
    
    historicalData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.date}</td>
            <td>${data.time}</td>
            <td>${data.temperature}°C</td>
            <td>${data.humidity}%</td>
            <td>${data.airQuality} AQI</td>
            <td>${data.cropHealth}%</td>
            <td><span class="status-badge ${data.status.toLowerCase()}">${data.status}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

function filterData() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // Filter logic would go here
    updateDataTable();
}

function exportToCSV() {
    const csvContent = [
        ['Date', 'Time', 'Temperature', 'Humidity', 'Air Quality', 'Crop Health', 'Status'],
        ...historicalData.map(data => [
            data.date, data.time, data.temperature, data.humidity, 
            data.airQuality, data.cropHealth, data.status
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crop-disease-detector-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function exportToPDF() {
    // Simple PDF export simulation
    alert('PDF export functionality would be implemented with a PDF library like jsPDF');
}

// Alerts functionality
function initializeAlerts() {
    // Check thresholds every 10 seconds
    setInterval(checkThresholds, 10000);
}

function checkThresholds() {
    const temperature = parseFloat(document.getElementById('temperature').textContent);
    const humidity = parseFloat(document.getElementById('humidity').textContent);
    const airQuality = parseFloat(document.getElementById('air-quality').textContent);
    const cropHealth = parseFloat(document.getElementById('crop-health').textContent);
    
    // Check temperature
    if (temperature > alertThresholds.temperature.max) {
        showAlert('warning', 'fas fa-thermometer-full', 'High Temperature Alert', 
                 `Temperature is ${temperature}°C, which is above the safe threshold of ${alertThresholds.temperature.max}°C.`);
    } else if (temperature < alertThresholds.temperature.min) {
        showAlert('warning', 'fas fa-thermometer-empty', 'Low Temperature Alert', 
                 `Temperature is ${temperature}°C, which is below the safe threshold of ${alertThresholds.temperature.min}°C.`);
    }
    
    // Check humidity
    if (humidity > alertThresholds.humidity.max) {
        showAlert('warning', 'fas fa-tint', 'High Humidity Alert', 
                 `Humidity is ${humidity}%, which is above the optimal range.`);
    } else if (humidity < alertThresholds.humidity.min) {
        showAlert('warning', 'fas fa-tint', 'Low Humidity Alert', 
                 `Humidity is ${humidity}%, which is below the optimal range.`);
    }
    
    // Check air quality
    if (airQuality > 80) {
        showAlert('danger', 'fas fa-wind', 'Poor Air Quality Alert', 
                 `Air Quality Index is ${airQuality}, which indicates poor air quality.`);
    }
    
    // Check crop health
    if (cropHealth < 60) {
        showAlert('warning', 'fas fa-seedling', 'Crop Health Warning', 
                 `Crop health is at ${cropHealth}%, which requires immediate attention.`);
    }
}

function showAlert(type, icon, title, message) {
    const alertsContainer = document.getElementById('alertsContainer');
    const alertId = Date.now();
    
    const alertElement = document.createElement('div');
    alertElement.className = `alert-notification ${type} blinking`;
    alertElement.id = `alert-${alertId}`;
    alertElement.innerHTML = `
        <button class="alert-close" onclick="closeAlert(${alertId})">&times;</button>
        <div class="alert-content">
            <h4><i class="${icon}"></i> ${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    alertsContainer.appendChild(alertElement);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        closeAlert(alertId);
    }, 10000);
}

function closeAlert(alertId) {
    const alertElement = document.getElementById(`alert-${alertId}`);
    if (alertElement) {
        alertElement.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            alertElement.remove();
        }, 300);
    }
}

// Data generation functions
function generateTimeLabels(period) {
    const labels = [];
    const now = new Date();
    
    switch(period) {
        case '24h':
            for (let i = 23; i >= 0; i--) {
                const time = new Date(now.getTime() - i * 60 * 60 * 1000);
                labels.push(time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
            }
            break;
        case '7d':
            for (let i = 6; i >= 0; i--) {
                const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                labels.push(date.toLocaleDateString([], {month: 'short', day: 'numeric'}));
            }
            break;
        case '30d':
            for (let i = 29; i >= 0; i--) {
                const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
                labels.push(date.toLocaleDateString([], {month: 'short', day: 'numeric'}));
            }
            break;
    }
    
    return labels;
}

function generateTemperatureData(period) {
    const data = [];
    const baseTemp = 24;
    
    for (let i = 0; i < getDataPoints(period); i++) {
        const variation = Math.sin(i * 0.3) * 5 + (Math.random() - 0.5) * 2;
        data.push(Math.max(15, Math.min(35, baseTemp + variation)));
    }
    
    return data;
}

function generateHumidityData(period) {
    const data = [];
    const baseHumidity = 65;
    
    for (let i = 0; i < getDataPoints(period); i++) {
        const variation = Math.sin(i * 0.2) * 10 + (Math.random() - 0.5) * 5;
        data.push(Math.max(30, Math.min(90, baseHumidity + variation)));
    }
    
    return data;
}

function generateSoilMoistureData(period) {
    const data = [];
    const baseMoisture = 78;
    
    for (let i = 0; i < getDataPoints(period); i++) {
        const variation = Math.sin(i * 0.1) * 8 + (Math.random() - 0.5) * 3;
        data.push(Math.max(40, Math.min(95, baseMoisture + variation)));
    }
    
    return data;
}

function generateFieldHealthData(field) {
    const healthData = {
        'A': [85, 10, 5],  // Tomatoes - mostly healthy
        'B': [70, 25, 5],  // Wheat - good with some moderate
        'C': [45, 35, 20]  // Corn - needs attention
    };
    
    return healthData[field] || [50, 30, 20];
}

function getDataPoints(period) {
    switch(period) {
        case '24h': return 24;
        case '7d': return 7;
        case '30d': return 30;
        default: return 24;
    }
}

// Start data simulation for demo purposes
function startDataSimulation() {
    // Initialize chart controls after charts are created
    setTimeout(initializeChartControls, 100);
    
    // Simulate alerts
    setTimeout(() => {
        addNewAlert('success', 'fas fa-check-circle', 'Harvest Complete', 'Field A tomatoes have been successfully harvested.', 'Just now');
    }, 10000);
    
    setTimeout(() => {
        addNewAlert('warning', 'fas fa-exclamation-triangle', 'Pest Alert', 'Unusual activity detected in Field C. Please inspect.', '5 minutes ago');
    }, 20000);
}

// Add new alert to the alerts list
function addNewAlert(type, icon, title, message, time) {
    const alertsList = document.querySelector('.alerts-list');
    if (!alertsList) return;
    
    const alertItem = document.createElement('div');
    alertItem.className = `alert-item ${type}`;
    alertItem.innerHTML = `
        <i class="${icon}"></i>
        <div class="alert-content">
            <h4>${title}</h4>
            <p>${message}</p>
            <span class="alert-time">${time}</span>
        </div>
    `;
    
    // Add animation
    alertItem.style.opacity = '0';
    alertItem.style.transform = 'translateY(-20px)';
    
    alertsList.insertBefore(alertItem, alertsList.firstChild);
    
    // Animate in
    setTimeout(() => {
        alertItem.style.transition = 'all 0.3s ease';
        alertItem.style.opacity = '1';
        alertItem.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove oldest alert if more than 5
    const alerts = alertsList.querySelectorAll('.alert-item');
    if (alerts.length > 5) {
        alerts[alerts.length - 1].style.transition = 'all 0.3s ease';
        alerts[alerts.length - 1].style.opacity = '0';
        alerts[alerts.length - 1].style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            alerts[alerts.length - 1].remove();
        }, 300);
    }
}

// Manual section switching function for testing
function switchToSection(sectionId) {
    console.log(`Manually switching to section: ${sectionId}`);
    
    const section = document.getElementById(sectionId);
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (section && navLink) {
        // Remove active from all
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active to target
        section.classList.add('active');
        navLink.classList.add('active');
        
        console.log(`✓ Successfully switched to ${sectionId}`);
        return true;
    } else {
        console.error(`✗ Failed to switch to ${sectionId} - section or nav link not found`);
        return false;
    }
}

// Utility functions
function formatNumber(num, decimals = 1) {
    return parseFloat(num).toFixed(decimals);
}

function getRandomColor() {
    const colors = ['#2d5016', '#4a7c59', '#7fb069', '#a8d5a8', '#8b4513', '#f4a460', '#87ceeb', '#ff7f50'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Export data functionality (for future implementation)
function exportData(format = 'csv') {
    console.log(`Exporting data in ${format} format...`);
    // Implementation would go here
}

// Print report functionality
function printReport() {
    window.print();
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Smart Farming System loaded successfully');
    console.log('Performance:', {
        loadTime: performance.now(),
        chartsInitialized: Object.keys(charts).length
    });
});
